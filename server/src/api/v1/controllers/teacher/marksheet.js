const { Test } = require("../../models/test.js");
const { Marksheet } = require("../../models/marksheet.js");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../../utils/apiError.js");

const createMarksheet = async (req,res) => {
  const { testId } = req.param
  const { marksheet,fullMarksOfTest } = req.body
  const academicYear = req.academicYear
  
  const t = await Test.findOneById(testId)
  
  if(!t) throw new APIError(StatusCodes.NOT_FOUND,"test don't exists with this testId.")
  
  const m = await Marksheet.create({
    test: testId,
    sheet: marksheet,
    academicYear,
    fullMarksOfTest
  })
  
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: m,
    message: 'marksheet for this test is created.'
  })
}

const updateMarksheet = async (req,res) => {
  const { testId } = req.param
  const data = req.body
  
  const t = await Test.findOneById(testId)
  
  if(!t) throw new APIError(StatusCodes.NOT_FOUND,"test don't exists with this testId.")
  
  const m = await Marksheet.findOneAndUpdte({test: testId},{...data},{new: true})
  
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: m,
    message: 'marksheet for this test is updated.'
  })
}

const getMarksheet = async (req,res) => {
  const { testId } = req.param
  
  const t = await Test.findOneById(testId)
  
  if(!t) throw new APIError(StatusCodes.NOT_FOUND,"test don't exists with this testId.")
  
  const m = await Marksheet.findOne({test: testId})
  
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: m,
    message: '.'
  })
}

module.exports = {
  getMarksheet,
  createMarksheet,
  updateMarksheet
}