
const ticketController = require("../controllers/ticketController")
const { authJwt } = require("../middleware")


module.exports = (app)=>{
    app.post("/crm/api/v1/tickets/",[authJwt.verifyToken],ticketController.createTicket)

    app.get("/crm/api/v1/tickets/",[authJwt.verifyToken],ticketController.getAllTickets)

    app.put("/crm/api/v1/tickets/:id", [authJwt.verifyToken], ticketController.updateTicket);

   }