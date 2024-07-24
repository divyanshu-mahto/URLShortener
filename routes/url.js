const express = require("express");
const {handleCreateShortUrl, handleVisitUrls, handleAnalytics, handleDeleteShortUrl} = require('../controllers/url')
const router = express.Router();

router.post('/',handleCreateShortUrl );
router.get('/:shortid', handleVisitUrls);
router.get('/analytics/:shortid', handleAnalytics);
router.delete('/:shortid', handleDeleteShortUrl);


module.exports = router;
