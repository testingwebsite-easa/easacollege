// backend/controllers/departmentController.js
// Controller functions for department related endpoints
// Implements credit distribution details for PDF dashboard

const { DepartmentData } = require('../models/Schemas');

/**
 * Get credit distribution details for a department.
 * Returns aggregated credit totals per semester and per vertical.
 * The result is used by the frontend to render a table in the PDF after the pie chart.
 */
const getDepartmentDetails = async (req, res) => {
  try {
    const { slug } = req.params;
    const dept = await DepartmentData.findOne({ departmentSlug: slug });
    if (!dept) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Aggregate credits by semester and vertical
    const creditsBySemester = {};
    const creditsByVertical = {};
    dept.subjects.forEach((sub) => {
      const { semester, vertical, verticalName, credits } = sub;
      // Semester aggregation
      if (!creditsBySemester[semester]) {
        creditsBySemester[semester] = 0;
      }
      creditsBySemester[semester] += credits || 0;

      // Vertical aggregation (use verticalName if available, else vertical id)
      const verticalKey = verticalName || `Vertical ${vertical}`;
      if (!creditsByVertical[verticalKey]) {
        creditsByVertical[verticalKey] = 0;
      }
      creditsByVertical[verticalKey] += credits || 0;
    });

    // Transform objects into arrays for easier consumption on frontend
    const semesterArray = Object.entries(creditsBySemester).map(([sem, total]) => ({ semester: Number(sem), totalCredits: total }));
    const verticalArray = Object.entries(creditsByVertical).map(([vert, total]) => ({ vertical: vert, totalCredits: total }));

    return res.json({
      semesterCredits: semesterArray,
      verticalCredits: verticalArray,
    });
  } catch (err) {
    console.error('Error fetching department credit details:', err);
    return res.status(500).json({ error: 'Server error while fetching details' });
  }
};

module.exports = { getDepartmentDetails };
