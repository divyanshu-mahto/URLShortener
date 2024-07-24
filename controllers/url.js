const shortid = require('shortid');
const URL = require('../models/url');

const handleCreateShortUrl = async (req,res) => {
    const body = req.body;
    if(!body.url){
        return res.json({error: "URL required"});
    }
    const shortId = shortid(8);
    await URL.create({
        shortid: shortId,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.status(201).json({shorturl : `http://localhost:8001/url/${shortId}`})
}

const handleVisitUrls = async(req,res) => {
    const shortId = req.params.shortid;
    const url = await URL.findOneAndUpdate({shortid: shortId}, {$push: {visitHistory: {timestamp: Date.now()}}});
    return res.redirect(url.redirectURL); 
}

const handleAnalytics = async(req,res) => {
    const shortId = req.params.shortid;
    const url = await URL.findOne({shortid: shortId});
    return res.json({numberOfVisits: url.visitHistory.length, visitHistory: url.visitHistory});
}

const handleDeleteShortUrl = async(req,res) => {
    const shortId = req.params.shortid;
    const url = await URL.findOneAndDelete({shortid: shortId});
    return res.json({status : "success", shortid: url.shortid});
}

module.exports = {
    handleCreateShortUrl,
    handleVisitUrls,
    handleAnalytics,
    handleDeleteShortUrl
}