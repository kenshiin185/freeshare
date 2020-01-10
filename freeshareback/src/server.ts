
import express from 'express';
import { FreesharebackApplication } from '.';
import { ApplicationConfig } from '@loopback/core';
import path from "path";
import { Request, Response } from "express";
import pEvent from 'p-event';
import { Server } from 'http';

export class ExpressServer {
    private app: express.Application;
    private lbApp: FreesharebackApplication;
    private server: Server | undefined;

    constructor(options: ApplicationConfig = {}) {
        this.app = express();
        this.lbApp = new FreesharebackApplication(options);
        this.app.use('/api', this.lbApp.requestHandler);
        // Custom Express routes
        this.app.get('/', function (_req: Request, res: Response) {
            res.sendFile(path.resolve('public/index.html'));
        });
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
}
