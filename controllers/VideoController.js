const fs = require('fs')
// const path = require('path')
const { google } = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET_KEY,
    process.env.GOOGLE_REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: process.env.GOOGLE_REFRESH_TOKEN})

const drive = google.drive({version: 'v3', auth: oauth2Client })

class VideoController {

    static async addVideo (req, res, next) {
        const { filename, mimetype, path } = req.file
        
        try {
            
            const response = await drive.files.create({
                requestBody: {
                    name: filename,
                    mimeType: mimetype
                },
                media: {
                    mimeType: mimetype,
                    body: fs.createReadStream(path)
                }
            })
            
            console.log(response.data)

            const fileId = response.data.id
            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            });

            const result = await drive.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink'
            });

            console.log(result.data)

            res.send({"message":"Server is running"})
        
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async deleteVideo (req, res, next) {
        try {
            const response = await drive.files.delete({
                fileId: '1v-fWWaWyzp9ABkKzjNRwZPZ11BUn4yoz'
            })
            console.log(response.data, response.status)
            res.send({"message":"Server is running"})
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async generatePublicUrl (req, res, next) {
        try {
            const fileId = '1v-fWWaWyzp9ABkKzjNRwZPZ11BUn4yoz'
            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            });

            const result = await drive.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink'
            });

            console.log(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}


module.exports = VideoController