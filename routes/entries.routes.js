const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in');
const Entry = require("../models/Entry.js");


router.get('/new', isSignedIn,(req,res)=>{
    res.render('entries.ejs')
})

router.post("/", isSignedIn , async (req, res) => {
    req.body.isPublic = req.body.isPublic === 'on';
    req.body.owner = req.session.user._id  
    const OneEntry = await Entry.create(req.body);
    res.redirect('/entries')
});

router.get('/', isSignedIn, async (req,res)=>{
    const publicEntries = await Entry.find({isPublic: true});
    res.render('all-entries.ejs', {entries: publicEntries})
})
router.get('/my-entries', isSignedIn, async (req,res)=>{
   const myEntries = await Entry.find({owner:req.session.user._id})
   res.render('my-entries.ejs',{entries: myEntries})
})
router.get('/:entryId/edit', isSignedIn, async(req,res)=>{
    const foundEntry = await Entry.findById(req.params.entryId)
    res.render('edit-entries.ejs',{entries: foundEntry})
})

router.put('/:entryId',  isSignedIn, async(req,res)=>{
      req.body.isPublic = req.body.isPublic === 'on';
     const updatedEntry = await Entry.findByIdAndUpdate(req.params.entryId,req.body)
    res.redirect('/entries')
    })

router.delete('/:entryId/',  isSignedIn, async(req,res)=>{
    const deletedEntry = await Entry.findByIdAndDelete(req.params.entryId)
    res.redirect('/entries')
})

module.exports = router;