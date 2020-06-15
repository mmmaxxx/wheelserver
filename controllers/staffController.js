const Member = require('../models/member')


exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json({
            response: 'Success',
            data: members
        })

    } catch (e) {
        res.status(error.statusCode || 500).json({response: e.data});
    }
};

exports.createMember = async (req, res) => {
    const name = req.body.name;
    const department = req.body.department;
    const email = req.body.email;
    let image;
    if (req.file) {
        image = req.file.path;
    }

    const member = new Member({
        name: name,
        department: department,
        email: email,
        image: image
    });

    try {
        await member.save();
        res.status(201).json({
            response: 'Success',
            member: member
        })
    } catch (e) {
        res.status(error.statusCode || 500).json({response: e.data});
    }

};

exports.updateMember = async (req, res) => {

    try {
        const memberId = req.params.memberId;

        const name = req.body.name;
        const department = req.body.department;
        const email = req.body.email;
        let image;

        console.log('inside update member');

        if (req.file) {
            image = req.file.path;
        }

        const member = await Member.findById(memberId);
        if (!member) {
            const error = new Error('No member found');
            error.statusCode = 404;
            throw error;
        }

        if (name) {
            member.name = name;
        }

        if (department) {
            member.department = department;
        }

        if (email) {
            member.email = email;
        }

        if (image) {
            member.image = image;
        }
        const updatedMember = await member.save();

        res.status(200).json({response: 'Success', data: updatedMember})

    } catch (e) {
        res.status(e.statusCode || 500).json({response: e});
    }

};

exports.getMember = async (req, res) => {
    const memberId = req.params.memberId;

    try {
        const member = await Member.findById(memberId);
        if (!member) {
            const error = new Error('No member found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({response: 'Success', data: member})

    } catch (e) {
        res.status(e.statusCode || 500).json({response: e});
    }

};


exports.deleteMember = async (req, res) => {
    const memberId = req.params.memberId;

    try {
        const member = await Member.findById(memberId);
        if (!member) {
            const error = new Error('No member found');
            error.statusCode = 404;
            throw error;
        }
        const deletedMember = await Member.findByIdAndDelete(memberId);
        res.status(200).json({response: 'Success', data: deletedMember})

    } catch (e) {
        res.status(error.statusCode || 500).json({response: e.data});
    }

};


