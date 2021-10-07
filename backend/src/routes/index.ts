import { error } from './../middlewares/error';
import ApiRouter from './ApiRouter';
import { BaseRouter } from './BaseRouter';
import express from 'express';
import cors = require('cors');
import path = require('path');

class IndexRouter extends BaseRouter {
   constructor() {
      super();
      this.configure();
      this.init();
   }

   private configure() {
      this.router.use(cors());
      this.router.use(express.json());
      this.router.use(express.urlencoded({ extended: true }));
      this.router.use(express.static(path.resolve('src/public')));
   }

   //Manage all routes
   protected init() {
      this.router.use('/api', ApiRouter);
      this.router.use(error);
   }
}

export = new IndexRouter().router;
