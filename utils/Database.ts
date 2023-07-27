import _mongoose, { connect } from "mongoose";

declare global {
    var mongoose: {
        promise: ReturnType<typeof connect> | null;
        conn: typeof _mongoose | null;
    }
}

const MONGOOSE_URI = process.env.MONGODB_URI;

if (!MONGOOSE_URI) {
    throw new Error("Please define MONGODB_URI in environement variables.")
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function Database() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = connect(MONGOOSE_URI!, opts)
            .then(mongoose => {
                return mongoose
            })
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
    }

    return cached.conn;
}

export default Database;