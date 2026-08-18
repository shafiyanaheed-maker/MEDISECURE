const db = require("../config/db");

const getHospitals = (req,res)=>{

    db.query(

        "SELECT * FROM hospitals ORDER BY hospital_name",

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

};

module.exports={

    getHospitals

};