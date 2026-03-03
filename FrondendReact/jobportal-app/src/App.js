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
              <PrivateLogin>
                <AllJobs />
              </PrivateLogin>
            }
          />
          <Route path="/cloudinary" element={<Cloudinary />} />
          <Route path="/Loading" element={<LoadingPage />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/platformJobs" element={<PlatformJobs />} />


          {/* Settings */}
          <Route path="/setting" element={<Settings />} />
          <Route path="/profileSetting" element={<ProfileSetting />} />
          <Route path="/account" element={<Account />} />
          <Route path="/security" element={<Security/>}/>
        <Route path="/forgot-password" element={<Security />} />
        <Route path="/reset-password/:token" element={<Security />} />

          {/* Jobseeker */}
          <Route
            path="/jobseekerProfile"
            element={
              <PrivateLogin>
                <JobseekerProfile />
              </PrivateLogin>
            }
          />
          <Route path="/appliedJobs" element={<AppliedJobs />} />
          <Route
            path="/jobseekerProfileForm"
            element={<JobseekerProfileForm />}
          />
          <Route path="/savedJobs" element={<SavedJobs />} />
          <Route path="/jobDescription/:id" element={<JobDescription />} />
          <Route path="/interviewCalls" element={<InterviewCalls />} />
          <Route path="/interviewCall/:id" element={<InterviewCall />} />
          <Route path="/jobseekerDashboard" element={<JobseekerDashbboard />} />
          <Route path="/viewStatusJobs" element={<ViewStatusJobs />} />
          <Route
            path="/viewStatusInterviews"
            element={<ViewStatusInterview />}
          />

          {/* Recruiter */}
          <Route path="/candidate/:id" element={<Candidate />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route
            path="/interviewCallDescription/:applicantId/:jobId"
            element={<InterviewCallDescription />}
          />
          <Route path="/myApplicants" element={<MyApplicants />} />
          <Route path="/postDetails/:id" element={<PostDetails />} />
          <Route path="/postForm" element={<PostForm />} />
          <Route path="/recruiterProfile" element={<RecruiterProfile />} />
          <Route
            path="/recruiterProfileForm"
            element={<RecruiterProfileForm />}
          />
          <Route path="/sheduleInterview" element={<SheduleInterview />} />
          <Route path="/sheduledInterviews" element={<SheduledInterviews />} />
          <Route path="/viewPosts" element={<ViewPosts />} />
          <Route path="/recruiterDashboard" element={<RecruiterDashboard />} />
          <Route path="/viewStatusPosts" element={<ViewStatusPosts />} />
          <Route
            path="/viewStatusApplicants"
            element={<ViewStatusApplicants />}
          />

          {/* Admin */}
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/adminProfileForm" element={<AdminProfileForm />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/jobseekerLists" element={<JobseekerLists />} />
          <Route path="/manageJobPosts" element={<ManageJobPosts />} />
          <Route path="/recruiterLists" element={<RecruiterLists />} />
          <Route path="/recruiterPosts" element={<RecruiterPosts />} />
          <Route path="/jobListPreview" element={<JobListPreview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
