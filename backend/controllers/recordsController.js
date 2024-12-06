const {
  RecordPermissions,
  TransactionRecords,
  UserProfiles,
  Permissions,
} = require("../models");
const { Op, Sequelize } = require("sequelize");

// Gets all records based where the user is permitted
const getRecords = async (req, res) => {
  const userId = await req.params.user;

  try {
    // Gets all records that the user is permitted to use
    const records = await TransactionRecords.findAll({
      include: [
        {
          model: RecordPermissions,
          as: "recordPermissions",
          where: { permittedUser: userId },
          accessType: {
            [Sequelize.Op.gte]: 1,
          },
          include: [
            {
              model: Permissions,
              as: "userAccess",
            },
          ],
        },
      ],
    });

    // If request is successful but returns an empty record, return
    if (!records) return res.status(404).json({ message: "No records found" });

    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getSingleRecord = async (req, res) => {
  const recordId = req.params.recordId;
  console.log(recordId);

  try {
    const results = await TransactionRecords.findOne({
      where: { recordId: recordId },
    });

    if (!records) return res.status(404).json({ message: "No records found" });

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const createRecord = async (req, res) => {
  const userId = req.session.userId;
  const { recordType, recordName, userPermissions } = req.body;

  try {
    const results = await TransactionRecords.create({
      creatorId: userId,
      recordType: recordType,
      recordName: recordName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!results) throw new Error("Record Creation Failure");

    const newRecordId = results.recordId;

    const response = await RecordPermissions.create({
      recordId: newRecordId,
      permittedUser: userId,
      accessLevel: 1,
    });

    if (!response) throw new Error("Record Creation Failure");

    if (Array.isArray(userPermissions) && userPermissions.length > 0) {
      const permissions = await Promise.all(
        userPermissions.map(async (userName) => {
          const user = await UserProfiles.findOne({
            where: { userName: userName },
          });

          if (!user) {
            throw new Error(`User with userName ${userName} not found`);
          }

          return {
            recordId: newRecordId,
            accessLevel: 3,
            permittedUser: user.profileId,
          };
        })
      );

      await RecordPermissions.bulkCreate(permissions);
    }
    res.status(200).json({ message: "Successful Record Creation", results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updateRecord = async (req, res) => {
  const { recordType, recordName, userPermissions } = req.body;
  const recordId = req.params.recordId;

  try {
    const results = await TransactionRecords.update(
      {
        recordType: recordType,
        recordName: recordName,
        updatedAt: new Date(),
      },
      {
        where: { recordId: recordId },
      }
    );

    if (!results) throw new Error("Record Update Failure");

    res.status(200).json({ message: "Successful Record Changes", results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const deleteRecord = async (req, res) => {
  const recordId = req.params.recordId;
  const userId = req.session.userId;

  try {
    const record = await TransactionRecords.findOne({
      where: { recordId: recordId },
    });

    await record.destroy();

    if (!record) return res.status(404).json({ message: "Record not found" });

    res.status(200).json({ message: "Successful Record Deletion" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getRecords,
  getSingleRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};
