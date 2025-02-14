const mongodb =require('../data/database');
const ObjectId =require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //swagger.tags=['Contacts']
    const result =await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
    
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
    //swagger.tags=['Contacts']
    const userId= new ObjectId(req.params.id);
    const result =await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
    result.toArray().then((contacts)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });

};

const createContact = async (req,res) => {
    //swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,

    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();    
    }   else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const updateContact = async (req,res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
    //swagger.tags=['Contacts']
    const userId= new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();    
    }   else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
    //swagger.tags=['Contacts']
    const userId= new ObjectId(req.params.id);
    const response =await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (response.deleteCount > 0) {
        res.status(204).send();    
    }   else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};




module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};