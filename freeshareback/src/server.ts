
import express from 'express';
import { FreesharebackApplication } from '.';
import { ApplicationConfig } from '@loopback/core';
import path from "path";
import { Request, Response } from "express";
import pEvent from 'p-event';
import { Server } from 'http';
import { v4 } from "uuid";
import { repository } from '@loopback/repository';
import { SourcesBddRepository } from './repositories';
import { SourcesBdd } from './models';

const fileUpLoad = require('express-fileupload');
const cors = require('cors');

export class ExpressServer {
    private app: express.Application;
    private lbApp: FreesharebackApplication;
    private server: Server | undefined;

    constructor(options: ApplicationConfig = {}) {
        this.app = express();
        this.app.use(cors());
        this.lbApp = new FreesharebackApplication(options);
        this.app.use('/api', this.lbApp.requestHandler);
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

        this.app.post("/uploadF", (req: any, res: any) => {
            
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
                this.lbApp.getRepository(SourcesBddRepository).then((repo:SourcesBddRepository)=>{
                    // repo trouvé
                    // création de l'instance sourcebdd
                    const instanceSources: SourcesBdd= new SourcesBdd();
                    instanceSources.pathFile = fileNamePhysique;
                    instanceSources.fileName = sampleFile.name;
                    instanceSources.owner = "";
                    instanceSources.date = new Date();
                    instanceSources.size = sampleFile.size;
                    instanceSources.title = "";
                    instanceSources.description = "";
                    instanceSources.typemime = sampleFile.mimetype;
                    repo.create(instanceSources).then((avecId: SourcesBdd)=>{
                        return res.send(
                        {
                            _id : avecId._id
                        }
                        );
                    }).catch((errCreate)=>{
                        return res.status(500).send("err insert "+ JSON.stringify(errCreate));
                    });


                });



                // res.send('File uploaded!');
                // res.sendStatus(200);
            });

        });

    }
    
}
