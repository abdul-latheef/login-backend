import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async(req, res) => {
    const {userName, name, email, password, gender, role, isActive} = req.body;
    try{
        const newUser = await prisma.user.create({
            data:{
                userName: userName,
                name: name,
                email: email,
                password: password,
                gender: gender,
                role: role,
                isActive: isActive
            },
        });
        res.status(201).json({
            message: "User created successfully",
            data: newUser,
        })
    }catch(error){
        res.status(500).json({
            message: "An error occurred while creating the movie.",
            error: error.message,
        })
    }finally {
        await prisma.$disconnect();
    }
}

export const getUsers = async(req, res) => {

    try {
        const getAllUsers = await prisma.user.findMany();
        res.status(200).json({
            message: "Users fetch successfully",
            data: getAllUsers
        })

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the users.",
            error: error.message,
        })
    }finally {
        await prisma.$disconnect();
    }

}

export const getAllUsersName = async(req, res) => {

    try {
        const getAllUsersName = await prisma.user.findMany({
            select: {
                id: true,
                name: true
            }
        });
        res.status(200).json({
            message: "Users fetch successfully",
            data: getAllUsersName
        })

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the users.",
            error: error.message,
        })
    }finally {
        await prisma.$disconnect();
    }

}



export const getUserByUserName = async(req, res) => {

    const {userName} = req.body;
    

    try {
        const getUserByName = await prisma.user.findUnique({
            where: {
                userName: String(userName)
            }
        })

        if(getUserByName)
        {
            console.log(userName)
            res.status(200).json({
                message: "User fetched successfully",
                data: getUserByName
            })
        } else{
            res.status(404).json({
                message: 'User not found.',
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching username.",
            error: error.message,
        });
    } finally {
        await prisma.$disconnect()
    }
}