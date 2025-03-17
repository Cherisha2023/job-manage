import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building, MapPin, DollarSign, CalendarCheck, List, ClipboardList, ClipboardCheck, FileText } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABka1cmCcYBguqAn6V-QFdBRtXCFm9rPk",
  authDomain: "job-management-161b6.firebaseapp.com",
  projectId: "job-management-161b6",
  storageBucket: "job-management-161b6.appspot.com",
  messagingSenderId: "939235619046",
  appId: "1:939235619046:web:987ff5aac74436b6708b27",
  measurementId: "G-J545XRP2Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CreateJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Full-time',
    salary: '',
    jobDescription: '',
    requirements: '',
    responsibilities: '',
    applicationDeadline: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'job'), jobDetails);
      alert('Job successfully created!');
      navigate('/');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Check the console for errors.');
    }
  };

  const InputField = ({ label, icon: Icon, ...props }) => (
    <div>
      <label className="block text-gray-600 mb-1 font-semibold">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
        <div className="p-2 bg-gray-100 border-r border-gray-300">
          <Icon className="text-gray-500" size={20} />
        </div>
        <input
          {...props}
          className="w-full p-2 focus:outline-none text-gray-700"
        />
      </div>
    </div>
  );

  const TextAreaField = ({ label, icon: Icon, ...props }) => (
    <div>
      <label className="block text-gray-600 mb-1 font-semibold">{label}</label>
      <div className="flex items-start border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
        <div className="p-2 bg-gray-100 border-r border-gray-300">
          <Icon className="text-gray-500" size={20} />
        </div>
        <textarea {...props} className="w-full p-2 focus:outline-none text-gray-700" rows="3"></textarea>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-700 mb-6">Create a New Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Job Title" name="title" value={jobDetails.title} onChange={handleChange} required icon={Briefcase} />
          <InputField label="Company" name="company" value={jobDetails.company} onChange={handleChange} required icon={Building} />
          <InputField label="Location" name="location" value={jobDetails.location} onChange={handleChange} required icon={MapPin} />
          <div>
            <label className="block text-gray-600 mb-1 font-semibold">Job Type</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="p-2 bg-gray-100 border-r border-gray-300">
                <List className="text-gray-500" size={20} />
              </div>
              <select name="jobType" value={jobDetails.jobType} onChange={handleChange} className="w-full p-2 focus:outline-none text-gray-700 bg-white">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
          <InputField label="Salary" type="number" name="salary" value={jobDetails.salary} onChange={handleChange} required icon={DollarSign} />
          <TextAreaField label="Job Description" name="jobDescription" value={jobDetails.jobDescription} onChange={handleChange} icon={FileText} />
          <TextAreaField label="Requirements" name="requirements" value={jobDetails.requirements} onChange={handleChange} icon={ClipboardList} />
          <TextAreaField label="Responsibilities" name="responsibilities" value={jobDetails.responsibilities} onChange={handleChange} icon={ClipboardCheck} />
          <InputField label="Application Deadline" type="date" name="applicationDeadline" value={jobDetails.applicationDeadline} onChange={handleChange} required icon={CalendarCheck} />
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white py-3 px-4 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 shadow-lg">Publish Job</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
