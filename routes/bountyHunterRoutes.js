const express = require("express");
const bountyHunterRouter = express.Router();
const Bounty = require("../models/bounty.js");

//const { v4: uuidv4 } = require("uuid");

// const bountyHunters = [
//     { firstName: "Joe", lastName: "Smith", isAlive: true, bountyAmount: 5000, type: "Sith", _id: uuidv4() },
//     { firstName: "Aaron", lastName: "John", isAlive: false, bountyAmount: 2300, type: "Jedi", _id: uuidv4() },
//     { firstName: "Clay", lastName: "Pak", isAlive: true, bountyAmount: 1000, type: "Sith", _id: uuidv4() },
//     { firstName: "David", lastName: "Babers", isAlive: false, bountyAmount: 7000, type: "Sith", _id: uuidv4() },
//     { firstName: "Justin", lastName: "Bieber", isAlive: false, bountyAmount: 6000, type: "Sith", _id: uuidv4() },
//     { firstName: "Harry", lastName: "Ezeodum", isAlive: false, bountyAmount: 6500, type: "Jedi", _id: uuidv4() },
//     { firstName: "Christian", lastName: "Angola", isAlive: true, bountyAmount: 1000, type: "Jedi", _id: uuidv4() },
//     { firstName: "Genesis", lastName: "Bronny", isAlive: true, bountyAmount: 2500, type: "Sith", _id: uuidv4() },
//     { firstName: "Voke", lastName: "Ojakovo", isAlive: true, bountyAmount: 3000, type: "Jedi", _id: uuidv4() },
//     { firstName: "Mike", lastName: "James", isAlive: false, bountyAmount: 5000, type: "Sith", _id: uuidv4() }
// ]

let error;
bountyHunterRouter.route("/")
    .get(async (req, res, next) => {
        try {
            const foundBounties = await Bounty.find({});
            res.status(200).send(foundBounties);

        } catch (err) {
            error = err.message;
            res.status(500).send({ err: error });
            return next(err);
            // res.status(500)
            // res.send(err);
            //res.json({ message: "Invalid endpoint" });
        }
    })

    .post(async (req, res, next) => {
        try {
            const newBounty = new Bounty(req.body)
            await newBounty.save()
            res.status(201).send(newBounty)
        } catch (err) {
            error = err.message;

            res.status(500).send({
                err_message: error
            });
            return next(err);
        }
    });

bountyHunterRouter.route("/:bountyId")
    .get(async (req, res, next) => {
        try {
            const bountyId = req.params.bountyId;
            const foundBountyHunter = await Bounty.findOne({ _id: bountyId })

            res.send(foundBountyHunter);
        } catch (err) {
            error = err.message;

            res.status(500).send({
                err: error,
                errMsg: `bountyID: ${req.params.bountyId} is invalid, Please provide the valid bountyID parameter`
            });
            return next({
                err: error,
                errMsg: `bountyID: ${req.params.bountyId} is invalid, Please provide the valid bountyID parameter`
            });
        }

    })

    .put(async (req, res, next) => {
        try {
            const bountyId = await req.params.bountyId;
            const updatedObject = await Bounty.findOneAndUpdate({ _id: bountyId }, req.body)
            res.status(201).send(updatedObject);
        } catch (err) {
            error = err.message;

            res.status(500).send({
                err: error,
                errMsg: `bountyID: ${req.params.bountyId} is invalid, Please provide the valid bountyID parameter`
            });
            return next({
                err: error,
                errMsg: `bountyID: ${req.params.bountyId} is invalid, Please provide the valid bountyID parameter`
            });
        }
    })

    .delete(async (req, res, next) => {
        try {
            const bountyId = req.params.bountyId;
            await Bounty.findOneAndDelete({ _id: bountyId })
            res.send("Successfully deleted a bounty hunter from the database!");
        } catch (err) {
            error = err.message;

            res.status(500).send({
                err: error,
                errMsg: `bountyID: ${req.params.bountyId} is invalid, Please provide the valid bountyID parameter`
            });
            return next({
                err: error,
                errMsg: `bountyID: ${req.params.bountyId} is invalid, Please provide the valid bountyID parameter`
            });
        }
    })

bountyHunterRouter.route("/search/type")
    .get(async (req, res, next) => {
        try {
            const type = req.query.type;
            const foundBountyByType = await Bounty.find({ type: type });
            if (foundBountyByType.length === 0) {
                res.status(500).send({ errMsg: `bountyID: ${req.query.type} is invalid, Please provide the valid bountyID parameter` });
                return next({ errMsg: `bountyID: ${req.query.type} is invalid, Please provide the valid bountyID parameter` });
            }
            res.status(200).send(foundBountyByType);
        } catch (err) {
            error = err.message;

            res.status(500).send({
                err: error
                //errMsg: `bountyID: ${req.query.type} is invalid, Please provide the valid bountyID parameter`
            });
            return next({
                err: error
                //errMsg: `bountyID: ${req.query.type} is invalid, Please provide the valid bountyID parameter`
            });
        }

    })

bountyHunterRouter.route("/search/isAlive")
    .get(async (req, res, next) => {
        try {
            const isAlive = req.query.isAlive;
            const isBountyAlive = await Bounty.find({ isAlive: isAlive });
            res.status(200).send(isBountyAlive);
        } catch (err) {
            error = err.message;

            res.status(500).send({
                err: error,
                errMsg: `bountyID: ${req.query.isAlive} is invalid, Please provide the valid bountyID parameter`
            });
            return next({
                err: error,
                errMsg: `bountyID: ${req.query.isAlive} is invalid, Please provide the valid bountyID parameter`
            });
        }

    })

module.exports = bountyHunterRouter;
