import { response } from "express";
import Emial from "../models/email.model.js";
import Email from "../models/email.model.js";



export const createEmail = async (req , res ) => {
    try {
        const userId =req.id;
        const {to , subject , message} = req.body ;

        if(!to || !subject || !message ) return res.status(400).json({
            message:"All the information is required" , 
            success: false,
        });

        const email = await Emial.create({
            to,
            subject,
            message,
            userId
        })

        return res.status(201).json({
            email
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
}


export const deleteEmail = async( req , res , next) => {
    try {
        const emailId  = req.params.id ;
        if(!emailId) return res.status(400).json({
            message:"Email id is reequired"
        });

        const email = await Emial.findByIdAndDelete(emailId);
        if (!email) return res.status(404).json({
            message: "Email not found"
        })

        return res.status(200).json({
            message: "Email Deleted Successfully"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
}


export const getAllEmailById = async (req, res ) => {
    try {
        const userId = req.id;
        
        const emails = await Email.find({userId});

        return res.status(200).json({emails})
    } catch (error) {
        console.error(error)
    }
}