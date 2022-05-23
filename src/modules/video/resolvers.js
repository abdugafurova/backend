import { VIDEO_CONFIG } from '#config/index'
import model from './model.js'
import sha256 from 'sha256'
import path from 'path'
import fs from 'fs'

export default {
    Mutation: {
        addVideo: async (_, { video_name, video_file }, { __, user_id }) => {
            const { createReadStream, filename, mimetype } = await video_file

            video_file = Date.now() + filename.replace(/\s/g, '')
            video_name = video_name.trim()

            const video_date = new Date()
            const video_size = out.bytesWritten / 1000 + ""

            model.addVideo(user_id, video_name, video_file, mimetype, video_date, video_size)

            let videos = await model.VIDEOS()
            
            let newVideo = videos.find(video => video.video_link == video_file)

            return {
                status: 200,
                message: "The video successfully added!",
                data: newVideo
            }
        },

        updateVideo: async (_, { video_id, video_name }) => {

            model.updateVideo(video_id, video_name)

            let videos = await model.VIDEOS()
            
            let newVideo = videos.find(video => video.video_id == video_id)
            newVideo.video_name = video_name
            return {
                status: 200,
                message: "The video successfully updated!",
                data: newVideo
            }
        },

        deleteVideo: async (_, { video_id }) => {
            model.deleteVideo( video_id )

            let videos = await model.VIDEOS()
            
            let newVideo = videos.find(video => video.video_id == video_id)

            return {
                status: 200,
                message: "The video successfully updated!",
                data: newVideo
            }
        },
    },

    Query: {
        videos: async (_, { pagination, search, sort }) => {
            const sorting = Object.keys(sort || {})[0]

            return await model.getVideos({
                sorting,
                search,
                sortValue: sort ? sort[sorting] : null,
                page: pagination?.page || VIDEO_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || VIDEO_CONFIG.PAGINATION.LIMIT,
            })
        },

        video: async (_, args) => {

            return await model.getVideo(args)
        }
    }
}