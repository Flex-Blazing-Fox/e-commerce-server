const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const VideoController = require('../controllers/VideoController')

const router = require('express').Router()

router.get('/', VideoController.generatePublicUrl)
router.post('/', upload.single('file'), VideoController.addVideo)
router.delete('/', VideoController.deleteVideo)

module.exports = router