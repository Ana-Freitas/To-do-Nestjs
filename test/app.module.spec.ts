import { NestFactory } from "@nestjs/core";
import * as supertest from "supertest";
import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import { ExpressAdapter } from "@nestjs/platform-express";
import { expect } from "chai";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "../src/app.module";

describe("StartUpPermanentAssetModule", () => {

	let instance;
	let application: INestApplication;

	before(async function () {
		instance = ExpressAdapter.prototype.getInstance;
		application = await NestFactory.create(AppModule, instance, {
			logger: {
			    log(message: string) {},
			    error(message: string, trace: string) {},
			    warn(message: string) {},
			    debug(message: string) {},
			    verbose(message: string) {}
			}
	  });

		application.useGlobalPipes(new ValidationPipe());
		application.useLogger({
			log(message: string) {},
            error(message: string, trace: string) {},
            warn(message: string) {},
            debug(message: string) {},
            verbose(message: string) {}
		});
		application.init();
	});

	after(async function () {
		application.close();
	});

	describe("Endpoints tasks", function () {

    describe("#POST /task", function () {
        it("Should verify POST method works", function () {
          return supertest(application.getHttpServer())
            .post("/task")
            .expect(201)
        });
    });

    describe("#GET /", function () {
      it("should verify if default service returns 404", function (done) {
        supertest(application.getHttpServer())
          .get("/")
          .end(function (err, res) {
            expect(res.status).to.be.equal(404);
            done(err);
          });
      });
    });

    describe("#GET /task", function () {
      it("should verify if returns 200 to get all tasks", function (done) {
        supertest(application.getHttpServer())
          .get("/task")
          .end(function (err, res) {
            expect(res.status).to.be.equal(200);
            done(err);
          });
      });
    });

    describe("#GET /task/:id", function () {
      it("should verify if returns 200 to get a tasks", function (done) {
        supertest(application.getHttpServer())
          .get("/task/1")
          .end(function (err, res) {
            expect(res.status).to.be.equal(200);
            done(err);
          });
      });
    });

    describe("#DELETE /task/:id", function () {
      it("should verify if returns 200 to delete a tasks", function (done) {
        supertest(application.getHttpServer())
          .get("/task/1")
          .end(function (err, res) {
            expect(res.status).to.be.equal(200);
            done(err);
          });
      });
    });

	});
}); 