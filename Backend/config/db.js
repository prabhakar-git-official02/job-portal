import mongoose from 'mongoose'
const connectdb = async() => {
    try{
    await mongoose.connect(process.env.MONGODB_URI);
    } catch(err){
        console.log(`Database Error,${err.message}`);
    }
}

export default connectdb