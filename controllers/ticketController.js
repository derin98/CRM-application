const Ticket = require("../models/ticket.model")
const User = require("../models/user.model")
const constants = require("../utils/constants")

exports.createTicket = async (req, res) => {
    try {
        const ticketObj = {

            title: req.body.title,
            ticketPriority: req.body.ticketPriority,
            description: req.body.description,
            status: req.body.status,
            reporter: req.userId
        }


        const engineer = await User.findOne({
            userType: constants.userTypes.engineer,
            userStatus: constants.userStatus.apporved
        })

        if (engineer) {
            ticketObj.assignee = engineer.userId
        }

        const ticketCreated = await Ticket.create(ticketObj)

        if (ticketCreated) {

            const customer = await User.findOne({
                userId: req.userId
            });

            customer.ticketsCreated.push(ticketCreated._id);
            await customer.save();

            if (engineer) {
                engineer.ticketsAssigned.push(ticketCreated._id);
                await engineer.save();
            }


        }

        res.status(201).send(ticketCreated)



    } catch (err) {
        console.log("Error while doing db operation ", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })

    }
}


exports.getAllTickets = async (req, res) => {

    /**
     * We need to find the userType
     * and depending on the user type we need to frame the search query
     */

    const user = await User.findOne({ userId: req.userId });
    const queryObj = {};
    const ticketsCreated = user.ticketsCreated; // this is an array of ticket _id 
    const ticketsAssigned = user.ticketsAssigned;

    if (user.userType == constants.userTypes.customer) {
        /**
         *    Query for fetching all the tickets created by the user
         * 
         * */
        if (!ticketsCreated) {
            return res.staus(200).send({
                message: "No tickets created by the user yet"
            });
        };

        queryObj["_id"] = { $in: ticketsCreated };

        console.log(queryObj);


    } else if (user.userType == constants.userTypes.engineer) {
        /**
         * Query object for fetching all the tickets assigned/created to a user
         */
        queryObj["$or"] = [{ "_id": { $in: ticketsCreated } }, { "_id": { $in: ticketsAssigned } }];

        console.log(queryObj);
    }

    const tickets = await Ticket.find(queryObj);

    res.status(200).send(tickets);


}

exports.updateTicket = async (req, res) => {

    try {

        const ticket = await Ticket.findOne({ "_id": req.params.id });

        /**
         * Update this ticket object based on the request body
         * passed
         */

        ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description;
        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status;
        ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee;


        const updatedTicket = await ticket.save();

        res.status(200).send(updatedTicket);
    
    } catch (err) {
        console.log("Some error while updating ticket ", err.message);
        res.status(500).send({
            message: "Some internal error while updating the ticket"
        })
    }
}