import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
const MissionPage = lazy(() => import('./pages/MissionPage'));
const CoreBeliefsPage = lazy(() => import('./pages/CoreBeliefsPage'));
const InstitutionPage = lazy(() => import('./pages/InstitutionPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const SyllabusDashboard = lazy(() => import('./pages/SyllabusDashboard'));
import ProtectedRoute from './components/ProtectedRoute';


const ManagementPage = lazy(() => import('./pages/ManagementPage'));
const MediaPressPage = lazy(() => import('./pages/MediaPressPage'));
const MilestonesPage = lazy(() => import('./pages/MilestonesPage'));
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'));
const GovernancePage = lazy(() => import('./pages/GovernancePage'));
const AdministrationPage = lazy(() => import('./pages/AdministrationPage'));
const PrincipalPage = lazy(() => import('./pages/PrincipalPage'));
const SustainabilityPage = lazy(() => import('./pages/SustainabilityPage'));
const CommunityOutreachPage = lazy(() => import('./pages/CommunityOutreachPage'));
// 
const DepartmentPage = lazy(() => import('./pages/DepartmentPage'));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'));
// 
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ResourcePage = lazy(() => import('./pages/ResourcePage'));
// import DigitalLibraryPage from './pages/resources/DigitalLibraryPage';
const RegulationsPage = lazy(() => import('./pages/resources/RegulationsPage'));
const StatutoryBodiesPage = lazy(() => import('./pages/resources/StatutoryBodiesPage'));
const FormsPage = lazy(() => import('./pages/resources/FormsPage'));
const AcademicCalendarPage = lazy(() => import('./pages/resources/AcademicCalendarPage'));
const FacultyHandbookPage = lazy(() => import('./pages/resources/FacultyHandbookPage'));
const StudentHandbookPage = lazy(() => import('./pages/resources/StudentHandbookPage'));
const SyllabusPage = lazy(() => import('./pages/resources/SyllabusPage'));

import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import StickyContactBar from './components/StickyContactBar';
import LoadingBar from './components/LoadingBar';
const DynamicPage = lazy(() => import('./pages/DynamicPage'));
const ResearchListingPage = lazy(() => import('./pages/ResearchListingPage'));
const CareerPage = lazy(() => import('./pages/CareerPage'));
const JobApplicationsView = lazy(() => import('./pages/JobApplicationsView'));
const AlumniRegistration = lazy(() => import('./pages/AlumniRegistration'));
const AlumniConnectPage = lazy(() => import('./pages/AlumniConnectPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const ScholarshipPage = lazy(() => import('./pages/ScholarshipPage'));
const PlacementPage = lazy(() => import('./pages/PlacementPage'));
const SkillingPage = lazy(() => import('./pages/SkillingPage'));
const HigherEducationPage = lazy(() => import('./pages/HigherEducationPage'));
const EntrepreneurshipPage = lazy(() => import('./pages/EntrepreneurshipPage'));
const AscendCenterPage = lazy(() => import('./pages/AscendCenterPage'));
const PacPage = lazy(() => import('./pages/PacPage'));
const BosPage = lazy(() => import('./pages/autonomous/BosPage'));
const CdcPage = lazy(() => import('./pages/autonomous/CdcPage'));
const StandingCommitteePage = lazy(() => import('./pages/autonomous/StandingCommitteePage'));
const GoverningBodiesPage = lazy(() => import('./pages/autonomous/GoverningBodiesPage'));
const AcademicCouncilPage = lazy(() => import('./pages/autonomous/AcademicCouncilPage'));
const ResultPassingBoardPage = lazy(() => import('./pages/autonomous/ResultPassingBoardPage'));
const CoursesRegisteredPage = lazy(() => import('./pages/autonomous/CoursesRegisteredPage'));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage'));
const AlumniSocial = lazy(() => import('./pages/AlumniSocial'));
import './index.css';
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const VideoGalleryPage = lazy(() => import('./pages/VideoGalleryPage'));
const VirtualTourPage = lazy(() => import('./pages/VirtualTourPage'));
const GrievancePage = lazy(() => import('./pages/GrievancePage'));
// Dynamic Static Pages
const HostelPage = lazy(() => import('./pages/HostelPage'));
const SportsPage = lazy(() => import('./pages/SportsPage'));
const AmenitiesPage = lazy(() => import('./pages/AmenitiesPage'));
const DhruvaFestPage = lazy(() => import('./pages/DhruvaFestPage'));
const StudentCellsPage = lazy(() => import('./pages/StudentCellsPage'));
const AssociationsPage = lazy(() => import('./pages/AssociationsPage'));
const CampusClubsPage = lazy(() => import('./pages/CampusClubsPage'));
const GymPage = lazy(() => import('./pages/GymPage'));
const YogaPage = lazy(() => import('./pages/YogaPage'));
const FoodCourtPage = lazy(() => import('./pages/FoodCourtPage'));
const CafeteriaPage = lazy(() => import('./pages/CafeteriaPage'));
const IqacAboutPage = lazy(() => import('./pages/IqacAboutPage'));
const IqacCommitteePage = lazy(() => import('./pages/IqacCommitteePage'));
import PopupAlert from './components/PopupAlert';
import { ThemeProvider } from './context/ThemeContext';
const ProfessionalChaptersPage = lazy(() => import('./pages/ProfessionalChaptersPage'));
const StorePage = lazy(() => import('./pages/StorePage'));
const TransportPage = lazy(() => import('./pages/TransportPage'));
const MedicalPage = lazy(() => import('./pages/MedicalPage'));
const Naac = lazy(() => import('./pages/Naac'));
const NaacDvv = lazy(() => import('./pages/NaacDvv'));
const NaacDistinction = lazy(() => import('./pages/NaacDistinction'));
const NaacBestPractices = lazy(() => import('./pages/NaacBestPractices'));
const NaacRti = lazy(() => import('./pages/NaacRti'));
const NaacFeedback = lazy(() => import('./pages/NaacFeedback'));
const NaacExtendedProfile = lazy(() => import('./pages/NaacExtendedProfile'));
const NaacCommittee = lazy(() => import('./pages/NaacCommittee'));
const AictePage = lazy(() => import('./pages/AictePage'));
const AicteEoaPage = lazy(() => import('./pages/AicteEoaPage'));
const SdgsPage = lazy(() => import('./pages/SdgsPage'));
const ObePage = lazy(() => import('./pages/ObePage'));
const NirfPage = lazy(() => import('./pages/NirfPage'));
const NbaPage = lazy(() => import('./pages/NbaPage'));
const Login = lazy(() => import('./pages/Login'));
const IdeaLabPage = lazy(() => import('./pages/IdeaLabPage'));



function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LoadingBar />
        <Router>
          <PopupAlert />
          <ScrollToTop />
          <Suspense fallback={<div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="loading-spinner" /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/professional-chapters" element={<ProfessionalChaptersPage />} />
            <Route path="/mission-vision" element={<MissionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRoles={['admin', 'hod', 'staff', 'student']}>
                  <SyllabusDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="//admin" element={<AdminDashboard />} />
            <Route path="//admin-dashboard" element={<AdminDashboard />} />
            <Route path="/core-beliefs" element={<CoreBeliefsPage />} />
            <Route path="/institution" element={<InstitutionPage />} />
            <Route path="/management" element={<ManagementPage />} />
            <Route path="/media-press" element={<MediaPressPage />} />
            <Route path="/milestones" element={<MilestonesPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/administration" element={<AdministrationPage />} />
            <Route path="/principal" element={<PrincipalPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/community-outreach" element={<CommunityOutreachPage />} />
            <Route path="/admin/applications" element={<JobApplicationsView />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/rd" element={<ResearchPage />} />
            <Route path="/rd-cell" element={<ResearchPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/academic-programs" element={<AcademicsPage />} />
            <Route path="/departments" element={<AcademicsPage />} />
            <Route path="/department/:id" element={<DepartmentPage />} />
            {/* Research Listing Routes */}
            <Route path="/department-research" element={<ResearchListingPage />} />
            <Route path="/student-research" element={<ResearchListingPage />} />
            <Route path="/faculty-research" element={<ResearchListingPage />} />
            <Route path="/industrial-research" element={<ResearchListingPage />} />
            <Route path="/ipr-cell" element={<ResearchListingPage />} />
            <Route path="/rd-projects" element={<ResearchListingPage />} />
            <Route path="/patents" element={<ResearchListingPage />} />
            {/* Resource Routes */}
            <Route path="/resources/digital-library" element={<LibraryPage />} />
            <Route path="/resources/regulations" element={<RegulationsPage />} />
            <Route path="/resources/statutory-bodies" element={<StatutoryBodiesPage />} />
            <Route path="/resources/forms" element={<FormsPage />} />
            <Route path="/resources/academic-calendar" element={<AcademicCalendarPage />} />
            <Route path="/resources/syllabus-curriculum" element={<SyllabusPage />} />
            <Route path="/resources/handbook/faculty" element={<FacultyHandbookPage />} />
            <Route path="/resources/handbook/student" element={<StudentHandbookPage />} />
            {/* Career & Alumni Routes */}
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/scholarships" element={<ScholarshipPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/admission" element={<AdmissionsPage />} />
            <Route path="/admissions-2026" element={<AdmissionsPage />} />
            <Route path="/admission-2026" element={<AdmissionsPage />} />
            <Route path="/alumni" element={<AlumniConnectPage />} />
            <Route path="/alumni-connect" element={<AlumniConnectPage />} />
            <Route path="/alumni-registration" element={<AlumniRegistration />} />
            <Route path="/alumni-social" element={<AlumniSocial />} />

            {/* Gallery Pages */}
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/video-gallery" element={<VideoGalleryPage />} />
            <Route path="/virtual-tour" element={<VirtualTourPage />} />

            {/* Grievance Pages */}
            <Route path="/grievance/:type" element={<GrievancePage />} />

            {/* Dynamic Content Pages */}
            <Route path="/page/library" element={<LibraryPage />} />
            <Route path="/page/hostel" element={<HostelPage />} />
            <Route path="/page/sports" element={<SportsPage />} />
            <Route path="/page/amenities" element={<AmenitiesPage />} />
            <Route path="/page/placement" element={<PlacementPage />} />
            <Route path="/page/skilling" element={<SkillingPage />} />
            <Route path="/page/higher-education" element={<HigherEducationPage />} />
            <Route path="/higher-education" element={<HigherEducationPage />} />
            <Route path="/page/entrepreneurship" element={<EntrepreneurshipPage />} />
            <Route path="/entrepreneurship" element={<EntrepreneurshipPage />} />
            <Route path="/ascend-center" element={<AscendCenterPage />} />
            <Route path="/page/ascend-center" element={<AscendCenterPage />} />
            <Route path="/ascend" element={<AscendCenterPage />} />
            <Route path="/page/pac" element={<PacPage />} />
            <Route path="/pac" element={<PacPage />} />
            <Route path="/program-advisory-committee" element={<PacPage />} />

            {/* Autonomous & Academic Bodies */}
            <Route path="/page/bos" element={<BosPage />} />
            <Route path="/bos" element={<BosPage />} />
            <Route path="/page/cdc" element={<CdcPage />} />
            <Route path="/cdc" element={<CdcPage />} />
            <Route path="/page/standing-committee" element={<StandingCommitteePage />} />
            <Route path="/standing-committee" element={<StandingCommitteePage />} />
            <Route path="/page/governing-bodies" element={<GoverningBodiesPage />} />
            <Route path="/governing-bodies" element={<GoverningBodiesPage />} />
            <Route path="/governing-body" element={<GoverningBodiesPage />} />
            <Route path="/page/academic-council" element={<AcademicCouncilPage />} />
            <Route path="/academic-council" element={<AcademicCouncilPage />} />
            <Route path="/page/result-passing-board" element={<ResultPassingBoardPage />} />
            <Route path="/result-passing-board" element={<ResultPassingBoardPage />} />
            <Route path="/page/courses-registered" element={<CoursesRegisteredPage />} />
            <Route path="/courses-registered" element={<CoursesRegisteredPage />} />
            <Route path="/page/autonomous-regulations" element={<RegulationsPage />} />

            <Route path="/page/fest" element={<DhruvaFestPage />} />
            <Route path="/page/cells" element={<StudentCellsPage />} />

            {/* IQAC Pages */}
            <Route path="/iqac-about" element={<IqacAboutPage />} />
            <Route path="/iqac-committee" element={<IqacCommitteePage />} />

            <Route path="/page/associations" element={<AssociationsPage />} />
            <Route path="/page/clubs" element={<CampusClubsPage />} />
            <Route path="/page/gym" element={<GymPage />} />
            <Route path="/page/yoga" element={<YogaPage />} />
            <Route path="/page/store" element={<StorePage />} />
            <Route path="/page/transport" element={<TransportPage />} />
            <Route path="/page/medical" element={<MedicalPage />} />
            <Route path="/naac" element={<Naac />} />
            <Route path="/naac-dvv-clarifications" element={<NaacDvv />} />
            <Route path="/naac-distinction" element={<NaacDistinction />} />
            <Route path="/naac-best-practices" element={<NaacBestPractices />} />
            <Route path="/naac-rti" element={<NaacRti />} />
            <Route path="/naac-feedback" element={<NaacFeedback />} />
            <Route path="/naac-extended-profile" element={<NaacExtendedProfile />} />
            <Route path="/naac-committee" element={<NaacCommittee />} />
            <Route path="/aicte" element={<AictePage />} />
            <Route path="/aicte-eoa" element={<AicteEoaPage />} />
            <Route path="/sdgs" element={<SdgsPage />} />
            <Route path="/obe" element={<ObePage />} />
            <Route path="/nirf" element={<NirfPage />} />
            <Route path="/nba" element={<NbaPage />} />
            <Route path="/page/nba" element={<NbaPage />} />
            <Route path="/idea-lab" element={<IdeaLabPage />} />
            <Route path="/page/cafeteria" element={<CafeteriaPage />} />
            <Route path="/page/food-court" element={<FoodCourtPage />} />
            <Route path="/page/:slug" element={<DynamicPage />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </Suspense>
          <ScrollToTopButton />
          <StickyContactBar />

        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
