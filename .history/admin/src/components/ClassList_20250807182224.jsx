import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy data for classes
const dummyClasses = [
    { id: 1, className: "10", section: "A", classTeacher: "Alice Johnson", strength: 30 },
    { id: 2, className: "10", section: "B", classTeacher: "Bob Smith", strength: 28 },
    { id: 3, className: "9", section: "A", classTeacher: "Carol Lee", strength: 32 },
    { id: 4, className: "8", section: "C", classTeacher: "David White", strength: 26 },
];

const ClassesList = () => {
    const [classes, setClasses] = useState([]);
    const [selectedSection, setSelectedSection] = useState("All");
    const navigate = useNavigate();

    const sectionList = ["All", ...new Set(dummyClasses.map(cls => cls.section))];

    useEffect(() => {
        setClasses(dummyClasses);
    }, []);

    const filteredClasses = selectedSection === "All"
        ? classes
        : classes.filter(cls => cls.section === selectedSection);

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            {/* Back to Dashboard Button */}
            <div className="mb-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-[#152259] hover:bg-[#101a3e] text-white px-4 py-2 rounded-md text-sm shadow"
                >
                    ← Back to Dashboard
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold" style={{ color: "#152259" }}>
                    Classes List
                </h2>

                <div>
                    <label className="text-sm font-medium mr-2 text-gray-700">Filter by Section:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                    >
                        {sectionList.map((section, idx) => (
                            <option key={idx} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "#152259" }} className="text-white px-4 py-3 text-left text-sm">Class</th>
                            <th style={{ backgroundColor: "#152259" }} className="text-white px-4 py-3 text-left text-sm">Section</th>
                            <th style={{ backgroundColor: "#152259" }} className="text-white px-4 py-3 text-left text-sm">Class Teacher</th>
                            <th style={{ backgroundColor: "#152259" }} className="text-white px-4 py-3 text-left text-sm">Strength</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClasses.length > 0 ? (
                            filteredClasses.map((cls) => (
                                <tr key={cls.id} className="hover:bg-[#eaefff]">
                                    <td className="px-4 py-3 border-b text-sm">{cls.className}</td>
                                    <td className="px-4 py-3 border-b text-sm">{cls.section}</td>
                                    <td className="px-4 py-3 border-b text-sm">{cls.classTeacher}</td>
                                    <td className="px-4 py-3 border-b text-sm">{cls.strength}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center px-4 py-6 text-gray-500">
                                    No classes found for selected section.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassesList;
