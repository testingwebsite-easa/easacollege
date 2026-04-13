import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MissionPage from './pages/MissionPage';
import CoreBeliefsPage from './pages/CoreBeliefsPage';
import InstitutionPage from './pages/InstitutionPage';


import ManagementPage from './pages/ManagementPage';
import MediaPressPage from './pages/MediaPressPage';
import MilestonesPage from './pages/MilestonesPage';
import LeadershipPage from './pages/LeadershipPage';
import GovernancePage from './pages/GovernancePage';
import AdministrationPage from './pages/AdministrationPage';
import PrincipalPage from './pages/PrincipalPage';
import SustainabilityPage from './pages/SustainabilityPage';
import CommunityOutreachPage from './pages/CommunityOutreachPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
// 
import DepartmentPage from './pages/DepartmentPage';
// 
import ResearchPage from './pages/ResearchPage';
import ResourcePage from './pages/ResourcePage';
// import DigitalLibraryPage from './pages/resources/DigitalLibraryPage';
import RegulationsPage from './pages/resources/RegulationsPage';
import StatutoryBodiesPage from './pages/resources/StatutoryBodiesPage';
import FormsPage from './pages/resources/FormsPage';
import AcademicCalendarPage from './pages/resources/AcademicCalendarPage';
import FacultyHandbookPage from './pages/resources/FacultyHandbookPage';
import StudentHandbookPage from './pages/resources/StudentHandbookPage';
import StickyContactBar from './components/StickyContactBar';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoadingBar from './components/LoadingBar';
import DynamicPage from './pages/DynamicPage';
import ResearchListingPage from './pages/ResearchListingPage';
import CareerPage from './pages/CareerPage';
import JobApplicationsView from './pages/JobApplicationsView';
import AlumniRegistration from './pages/AlumniRegistration';
import LibraryPage from './pages/LibraryPage';
import ScholarshipPage from './pages/ScholarshipPage';
import PlacementPage from './pages/PlacementPage';
import SkillingPage from './pages/SkillingPage';
import AdmissionsPage from './pages/AdmissionsPage';
import AlumniSocial from './pages/AlumniSocial';
import './index.css';
import NotFoundPage from './pages/NotFoundPage';
import GalleryPage from './pages/GalleryPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import VirtualTourPage from './pages/VirtualTourPage';
import GrievancePage from './pages/GrievancePage';
// Dynamic Static Pages
import HostelPage from './pages/HostelPage';
import SportsPage from './pages/SportsPage';
import AmenitiesPage from './pages/AmenitiesPage';
import DhruvaFestPage from './pages/DhruvaFestPage';
import StudentCellsPage from './pages/StudentCellsPage';
import AssociationsPage from './pages/AssociationsPage';
import CampusClubsPage from './pages/CampusClubsPage';
import GymPage from './pages/GymPage';
import YogaPage from './pages/YogaPage';
import FoodCourtPage from './pages/FoodCourtPage';
import CafeteriaPage from './pages/CafeteriaPage';
import IqacAboutPage from './pages/IqacAboutPage';
import IqacCommitteePage from './pages/IqacCommitteePage';
import PopupAlert from './components/PopupAlert';
import { ThemeProvider } from './context/ThemeContext';
import ProfessionalChaptersPage from './pages/ProfessionalChaptersPage';
import StorePage from './pages/StorePage';
import TransportPage from './pages/TransportPage';
import MedicalPage from './pages/MedicalPage';
import Naac from './pages/Naac';
import NaacDvv from './pages/NaacDvv';
import NaacDistinction from './pages/NaacDistinction';
import NaacBestPractices from './pages/NaacBestPractices';
import NaacRti from './pages/NaacRti';
import NaacFeedback from './pages/NaacFeedback';
import NaacExtendedProfile from './pages/NaacExtendedProfile';
import NaacCommittee from './pages/NaacCommittee';
import AictePage from './pages/AictePage';
import AicteEoaPage from './pages/AicteEoaPage';
import SdgsPage from './pages/SdgsPage';
import ObePage from './pages/ObePage';
import NirfPage from './pages/NirfPage';



function App() {

  return (
    <ThemeProvider>
      <LoadingBar />
      <Router>
        <PopupAlert />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professional-chapters" element={<ProfessionalChaptersPage />} />
          <Route path="/mission-vision" element={<MissionPage />} />
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
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<JobApplicationsView />} />
          <Route path="/research" element={<ResearchPage />} />
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
          <Route path="/resources/handbook/faculty" element={<FacultyHandbookPage />} />
          <Route path="/resources/handbook/student" element={<StudentHandbookPage />} />
          {/* Career Page Route */}
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/scholarships" element={<ScholarshipPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/admission" element={<AdmissionsPage />} />
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


          <Route path="/page/cafeteria" element={<CafeteriaPage />} />

          <Route path="/page/food-court" element={<FoodCourtPage />} />

          <Route path="/page/:slug" element={<DynamicPage />} />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
        <ScrollToTopButton />
        <StickyContactBar />
      </Router>
    </ThemeProvider>
  );
}

export default App;
