
/**
 * Required External Modules and Interfaces
 */

import express from "express";
import * as UserService from "./users.service";
import { BaseUser,User } from "./user.interface";

/**
 * Router Definition
 */

export const usersRouter= express.Router();

/**
 * Controller Definitions
 */



// GET items

usersRouter.get("/", async ( req,res)=>{
    try{
        const users: User[] = await UserService.findAll();
        res.status(200).send(users);
    }catch(e){
        res.status(500).send(e);
    }
});


// GET items/:id

usersRouter.get("/:id", async ( req,res)=>{
    const id: number=  parseInt(req.params.id,10);

    try{
        const user: User = await UserService.find(id);
        res.status(200).send(user);
        if(user){
            return res.status(200).send(user);
        }
        else{
            res.status(404).send("item not found");
        }
    }catch(e){
        res.status(500).send(e);
    }
});


// POST items

usersRouter.post("/", async ( req,res)=>{
    

    try{
        const user:BaseUser=req.body;
        const newUser= await UserService.create(user);
        res.status(201).json(newUser);
    }catch(e){
        res.status(500).send(e);
    }
});

// PUT items/:id
usersRouter.put("/:id", async ( req,res)=>{
    const id:number=parseInt(req.params.id,10);

    try{
        const userUpdate:User=req.body;
        const existingUser: User= await UserService.find(id);
        if(existingUser){
            const updateUser= await UserService.update(id, userUpdate);
            return res.status(200).json(updateUser);
        }
        const newUser= await UserService.create(userUpdate);
        res.status(201).json(newUser);
    }catch(e){
        res.status(500).send(e);
    }
});


// DELETE items/:id

usersRouter.delete("/:id", async ( req,res)=>{
    try{
        const id:number=parseInt(req.params.id,10);
        await UserService.remove(id);
       
        res.sendStatus(204);
    }catch(e){
        res.status(500).send(e);
    }
});