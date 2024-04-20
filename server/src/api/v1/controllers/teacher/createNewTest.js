const { Test } = require("../../models/test.js")
const { StatusCodes } = require("http-status-codes")

const createTest = async(req,res)=>{
  const user = req.user
  const {
    name,
    description,
    forStandard
  } = req.body;
  
  const t = await Test.create({
    name,
    description,
    forStandard,
    createdBy: user._id
  })
  
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Test is Created',
    data: t
  })
}

const updateTest = async(req,res)=>{
  const { testId } = req.params;
  const user = req.user;
  const data = req.body;
  
  const t = await Test.findById(test).lean()
  
  const isUserAdmin = req.user.role.contains("ADMIN");
  const isTestOwnerSame = t.createdBy.toString() === user._id.toString()
  
  if(!isTestOwnerSame && !isUserAdmin) throw new APIError(StatusCodes.BAD_REQUEST,"cannot edit test as it is not created by you.")
  
  const u = await Test.findByIdAndUpdate(testId,{
    ...data
  },{new: true})
  
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Test is updated',
    data: u
  })
}
const deleteTest = async(req,res)=>{
  const { testId } = req.params;
  const user = req.user;
  
  const t = await Test.findById(test).lean()
  
  const isUserAdmin = req.user.role.contains("ADMIN");
  const isTestOwnerSame = t.createdBy.toString() === user._id.toString()
  
  if(!isTestOwnerSame && !isUserAdmin) throw new APIError(StatusCodes.BAD_REQUEST,"cannot edit test as it is not created by you.")
  
  await Test.findByIdAndDelete(testId);
  
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Test is deleted',
  })
}

module.exports = {
  createTest,
  updateTest,
  deleteTest
}