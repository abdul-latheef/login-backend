import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient;

export const createItems = async(req,res) => {
    const {itemNumber, itemName, itemDescription, itemUom, price, date} = req.body;
    try {

        const existingItem = await prisma.itemHeader.findUnique({
            where: {
                itemNumber: itemNumber
            }
        })

        if(existingItem){
            return res.status(400).json({
                message:"An item with this item number already exists.",
            })
        }

        const createItem = await prisma.itemHeader.create({
            data:{
                itemNumber: itemNumber,
                itemName: itemName,
                itemDescription: itemDescription,
                
            }
        })

        const createItemDetails = await prisma.itemDetails.create({
            data:{
                itemUom: itemUom,
                price: price,
                date: new Date(date).toISOString(),
                itemHeaderId: createItem.id
            }
        })

        res.status(201).json({
            message: "item created successfully",
            data: createItem,
        })

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the item.",
            error: error.message,
        }) 
    }finally {
        await prisma.$disconnect();
    }
}


export const getItems = async(req, res) => {

    try {
        const getAllItems = await prisma.itemHeader.findMany({
            include:{
                itemDetails:true
            }
        })

        res.status(200).json({
            message: "item fetch successfully",
            data: getAllItems
        })

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the item.",
            error: error.message,
        })
    }finally {
        await prisma.$disconnect();
    }

}

export const searchItems = async (req, res) => {
    const { itemUom, itemName } = req.body; // Get itemUom and itemName from request body

    // Ensure at least one parameter is provided
    if (!itemUom && !itemName) {
        return res.status(400).json({
            message: "At least one parameter (itemUom or itemName) is required.",
        });
    }

    try {
        // Build the Prisma query based on the provided parameters
        const items = await prisma.itemHeader.findMany({
            where: {
                OR: [
                    itemUom ? {
                        itemDetails: {
                            some: {
                                itemUom: itemUom
                            }
                        }
                    } : {},
                    itemName ? {
                        itemName: {
                            contains: itemName, // Case-insensitive search for itemName
                            
                        }
                    } : {}
                ]
            },
            include: {
                itemDetails: true // Include related itemDetails if needed
            }
        });

        // Send the fetched items as the response
        res.status(200).json({
            message: "Items retrieved successfully",
            data: items,
        });
    } catch (error) {
        // Handle any errors that occur during the fetch
        res.status(500).json({
            message: "An error occurred while retrieving items.",
            error: error.message,
        });
    } finally {
        await prisma.$disconnect();
    }
};