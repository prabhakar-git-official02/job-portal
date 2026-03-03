import "./App.css";
import "@fontsource/poppins";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Pages/Home";
import AllJobs from "./Pages/AllJobs";
import PostForm from "./Pages/Recruiter/PostForm";
import RecruiterProfileForm from "./Pages/Recruiter/RecruiterProfileForm";
import ViewPosts from "./Pages/Recruiter/ViewPosts";
import AppliedJobs from "./Pages/Jobseeker/AppliedJobs";
import JobseekerProfileForm from "./Pages/Jobseeker/JobseekerProfileForm";
import SavedJobs from "./Pages/Jobseeker/SavedJobs";
import AdminProfileForm from "./Pages/Admin/AdminProfileForm";
import JobseekerProfile from "./Pages/Jobseeker/JobseekerProfile";
import Cloudinary from "./Components/Cloudinary";
import RecruiterProfile from "./Pages/Recruiter/RecruiterProfile";
import AdminProfile from "./Pages/Admin/AdminProfile";
import PrivateLogin from "./Private/PrivateLogin";
import ForgotPass from "./Auth/ForgotPass";
import ResetPass from "./Auth/ResetPass";
import GoogleLoginPage from "./Auth/GoogleLoginPage";
import Settings from "./settings/Settings";
import ProfileSetting from "./settings/ProfileSetting";
import LoadingPage from "./Private/LoadingPage";
import Account from "./settings/Account";
import JobDescription from "./Pages/Jobseeker/JobDescription";
import MyApplicants from "./Pages/Recruiter/MyApplicants";
import Candidates from "./Pages/Recruiter/Candidates";
import Candidate from "./Pages/Recruiter/Candidate";
import PostDetails from "./Pages/Recruiter/PostDetails";
import Notifications from "./Pages/Notifications.jsx";
import SheduleInterview from "./Pages/Recruiter/SheduleInterview";
import InterviewCalls from "./Pages/Jobseeker/InterviewCalls";
import InterviewCall from "./Pages/Jobseeker/InterviewCall.jsx";
import SheduledInterviews from "./Pages/Recruiter/SheduledInterviews.jsx";
import InterviewCallDescription from "./Pages/Recruiter/InterviewCallDescription.jsx";
import PlatformJobs from "./Pages/PlatformJobs.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import JobseekerLists from "./Pages/Admin/JobseekerLists.jsx";
import ManageJobPosts from "./Pages/Admin/ManageJobPosts.jsx";
import RecruiterLists from "./Pages/Admin/RecruiterLists.jsx";
import RecruiterPosts from "./Pages/Admin/RecruiterPosts.jsx";
import JobListPreview from "./Pages/Admin/JobListPreview.jsx";
import RecruiterDashboard from "./Pages/Recruiter/RecruiterDashboard.jsx";
import ViewStatusPosts from "./Pages/Recruiter/ViewStatusPosts.jsx";
import ViewStatusApplicants from "./Pages/Recruiter/ViewStatusApplicants.jsx";
import JobseekerDashbboard from "./Pages/Jobseeker/JobseekerDashboard.jsx";
import ViewStatusJobs from "./Pages/Jobseeker/ViewStatusJobs.jsx";
import ViewStatusInterview from "./Pages/Jobseeker/ViewStatusInterview.jsx";
import Security from "./settings/Security.jsx";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/googleLoginPage" element={<GoogleLoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPass />} />
          <Route path={"/reset-password/:token"} element={<ResetPass />} />
          <Route
            path="/allJobs"
            element={
                <AllJobs />
            }
          />
          <Route path="/cloudinary" element={<Cloudinary />} />
          <Route path="/Loading" element={<LoadingPage />} />
          <Route path="/notification" element={<PrivateLogin><Notifications /></PrivateLogin>} />
          <Route path="/platformJobs" element={<PlatformJobs />} />


          {/* Settings */}
          <Route path="/setting" element={<PrivateLogin><Settings /></PrivateLogin>} />
          <Route path="/profileSetting" element={<PrivateLogin><ProfileSetting /></PrivateLogin>} />
          <Route path="/account" element={<PrivateLogin><Account /></PrivateLogin>} />
          <Route path="/security" element={<Security/>}/>

          {/* Jobseeker */}
          <Route
            path="/jobseekerProfile"
            element={
              <PrivateLogin>
                <JobseekerProfile />
              </PrivateLogin>
            }
          />
          <Route path="/appliedJobs" element={<PrivateLogin><AppliedJobs /></PrivateLogin>} />
          <Route
            path="/jobseekerProfileForm"
            element={<PrivateLogin><JobseekerProfileForm /></PrivateLogin>}
          />
          <Route path="/savedJobs" element={<PrivateLogin><SavedJobs /></PrivateLogin>} />
          <Route path="/jobDescription/:id" element={<PrivateLogin><JobDescription /></PrivateLogin>} />
          <Route path="/interviewCalls" element={<PrivateLogin><InterviewCalls /></PrivateLogin>} />
          <Route path="/interviewCall/:id" element={<PrivateLogin><InterviewCall /></PrivateLogin>} />
          <Route path="/jobseekerDashboard" element={<PrivateLogin><JobseekerDashbboard /></PrivateLogin>} />
          <Route path="/viewStatusJobs" element={<PrivateLogin><ViewStatusJobs /></PrivateLogin>} />
          <Route
            path="/viewStatusInterviews"
            element={<PrivateLogin><ViewStatusInterview /></PrivateLogin>}
          />

          {/* Recruiter */}
          <Route path="/candidate/:id" element={<PrivateLogin><Candidate /></PrivateLogin>} />
          <Route path="/candidates" element={<PrivateLogin><Candidates /></PrivateLogin>} />
          <Route
            path="/interviewCallDescription/:applicantId/:jobId"
            element={<PrivateLogin><InterviewCallDescription /></PrivateLogin>}
          />
          <Route path="/myApplicants" element={<PrivateLogin><MyApplicants /></PrivateLogin>} />
          <Route path="/postDetails/:id" element={<PrivateLogin><PostDetails /></PrivateLogin>} />
          <Route path="/postForm" element={<PrivateLogin><PostForm /></PrivateLogin>} />
          <Route path="/recruiterProfile" element={<PrivateLogin><RecruiterProfile /></PrivateLogin>} />
          <Route
            path="/recruiterProfileForm"
            element={<PrivateLogin><RecruiterProfileForm /></PrivateLogin>}
          />
          <Route path="/sheduleInterview" element={<PrivateLogin><SheduleInterview /></PrivateLogin>} />
          <Route path="/sheduledInterviews" element={<PrivateLogin><SheduledInterviews /></PrivateLogin>} />
          <Route path="/viewPosts" element={<PrivateLogin><ViewPosts /></PrivateLogin>} />
          <Route path="/recruiterDashboard" element={<PrivateLogin><RecruiterDashboard /></PrivateLogin>} />
          <Route path="/viewStatusPosts" element={<PrivateLogin><ViewStatusPosts /></PrivateLogin>} />
          <Route
            path="/viewStatusApplicants"
            element={<PrivateLogin><ViewStatusApplicants /></PrivateLogin>}
          />

          {/* Admin */}
          <Route path="/adminProfile" element={<PrivateLogin><AdminProfile /></PrivateLogin>} />
          <Route path="/adminProfileForm" element={<PrivateLogin><AdminProfileForm /></PrivateLogin>} />
          <Route path="/adminDashboard" element={<PrivateLogin><AdminDashboard /></PrivateLogin>} />
          <Route path="/jobseekerLists" element={<PrivateLogin><JobseekerLists /></PrivateLogin>} />
          <Route path="/manageJobPosts" element={<PrivateLogin><ManageJobPosts /></PrivateLogin>} />
          <Route path="/recruiterLists" element={<PrivateLogin><RecruiterLists /></PrivateLogin>} />
          <Route path="/recruiterPosts" element={<PrivateLogin><RecruiterPosts /></PrivateLogin>} />
          <Route path="/jobListPreview" element={<PrivateLogin><JobListPreview /></PrivateLogin>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
