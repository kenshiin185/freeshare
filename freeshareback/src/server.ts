
import express from 'express';
import { FreesharebackApplication } from '.';
import { ApplicationConfig } from '@loopback/core';
import path from "path";
import { Request, Response } from "express";
import pEvent from 'p-event';
import { Server } from 'http';
import { v4 } from "uuid";
import { repository, RepositoryMetadata } from '@loopback/repository';
import { SourcesBddRepository } from './repositories';
import { SourcesBdd } from './models';
import passport from 'passport';
import passport_jwt from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import fs from 'fs';

const fileUpLoad = require('express-fileupload');
const cors = require('cors');
const im = require('imagemagick');

export class ExpressServer {
    private app: express.Application;
    private lbApp: FreesharebackApplication;
    private server: Server | undefined;

    constructor(options: ApplicationConfig = {}) {
        this.app = express();
        this.app.use(cors());
        this.lbApp = new FreesharebackApplication(options);
        this.app.use('/api', this.lbApp.requestHandler);
        this.initElementPassport();
        // Custom Express routes
        this.app.get('/', function (_req: Request, res: Response) {
            res.sendFile(path.resolve('public/index.html'));
        });
        this.initUpLoader(); // upload

        this.app.get('/hello', function (_req: Request, res: Response) {
            res.send('Hello world!');
        });
    }


    async boot() {
        await this.lbApp.boot();
    }

    public async start() {
        await this.lbApp.start();
        const port = this.lbApp.restServer.config.port || 3000;
        const host = this.lbApp.restServer.config.host || '127.0.0.1';
        this.server = this.app.listen(port, host);
        await pEvent(this.server, 'listening');
    }

    // For testing purposes
    public async stop() {
        if (!this.server) return;
        await this.lbApp.stop();
        this.server.close();
        await pEvent(this.server, 'close');
        this.server = undefined;
    }


    private initUpLoader() {
        this.app.use(fileUpLoad());

        this.app.post("/uploadF", passport.authenticate('jwt', { session: false }), (req: any, res: any) => {


            console.log("---upload---");
            console.log(req.files);

            if (!req.files || Object.keys(req.files).length === 0) { // pas de fichier reçu ?
                return res.status(400).send('No files were uploaded.');
            }

            let sampleFile: any = req.files.file;

            const fileNamePhysique: string = `${v4()}-${sampleFile.name}`;

            sampleFile.mv(`download/${fileNamePhysique}`, (err: any) => {
                if (err) {
                    return res.status(500).send("err déplacement file");
                }

                // mv ok
                // recherche du repo
                this.lbApp.getRepository(SourcesBddRepository).then((repo: SourcesBddRepository) => {
                    // repo trouvé
                    // création de l'instance sourcebdd
                    const instanceSources: SourcesBdd = new SourcesBdd();
                    instanceSources.pathFile = fileNamePhysique;
                    instanceSources.fileName = sampleFile.name;
                    instanceSources.owner = "";
                    if (req.user) {
                        instanceSources.owner = req.user.id;
                    }
                    instanceSources.date = new Date();
                    instanceSources.size = sampleFile.size;
                    instanceSources.title = "";
                    instanceSources.description = "";
                    instanceSources.typemime = sampleFile.mimetype;
                    repo.create(instanceSources).then((avecId: SourcesBdd) => {

                        if (sampleFile.mimetype.startsWith("image/")) {

                            im.convert([`download/${fileNamePhysique}`, '-resize', '150x150', `vignette/${fileNamePhysique}`],
                                function (err: any, stdoutOut: any) {
                                    if (err) {
                                        return res.status(500).send("err insert " + JSON.stringify(err));
                                    };
                                    console.log('fileNameOut:', stdoutOut);
                                    return res.send(
                                        {
                                            _id: avecId._id
                                        }
                                    );
                                });
                        } else {
                            return res.send(
                                {
                                    _id: avecId._id
                                }
                            );
                        }

                    }).catch((errCreate) => {
                        return res.status(500).send("err insert " + JSON.stringify(errCreate));
                    });


                });




            });

        });


        this.app.get("/download/:idFile",
            (req, res) => {
                const idFile = req.params.idFile;
                this.lbApp.getRepository(SourcesBddRepository).then((repoMeta: SourcesBddRepository) => {
                    repoMeta.findById(idFile).then((readFile) => {
                        const file = path.resolve(__dirname, "..", `download/${readFile.pathFile}`);

                        const mimetype = readFile.typemime;

                        if (req.query.attachment) {
                            res.setHeader('Content-disposition', `attachment; filename=${readFile.fileName}`);
                        }
                        res.setHeader('Content-type', mimetype);

                        let filestream = fs.createReadStream(file);

                        filestream.pipe(res);
                    }).catch((errRead) => {
                        res.sendStatus(404);
                    })
                }).catch((err) => {
                    res.sendStatus(500);
                })
            }
        );


    }

    private initElementPassport(): void {
        this.app.use(passport.initialize()); // init de passport
        // mise en place de la  strategie passport jwt
        passport.use(new passport_jwt.Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "@@??MotDePassePour_-Generation**token$$$"
        },
            function (jwtPayload, cb) {
                console.log(jwtPayload);

                return cb(null, { id: jwtPayload.id });
            }
        )
        )
    }

}
