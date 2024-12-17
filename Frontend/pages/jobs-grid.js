import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import StarButton from '../components/elements/StarButton';
import CompanyDetails from "./company-details";

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const departments = [
  { value: '0', label: 'Department' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Electrical Engineering', label: 'Electrical Engineering' },
  { value: 'Design Engineering', label: 'Design Engineering' },
  { value: 'Engineering Physics', label: 'Engineering Physics' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Biotech Engineering', label: 'Biotech Engineering' },
  { value: 'Computer Science Engineering', label: 'Computer Science Engineering' }
];

export default function JobGrid() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('0');

  const fetchProblems = (searchKeyword = '', department = '0') => {
    console.log('Fetching problems with:', { searchKeyword, department }); // Debugging
    setLoading(true);
    fetch(`/api/jobbing?keyword=${encodeURIComponent(searchKeyword)}&department=${encodeURIComponent(department)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Debugging
        setProblems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Retrieve the search query and selected department from local storage
    const storedQuery = localStorage.getItem('searchQuery') || '';
    const storedDepartment = localStorage.getItem('selectedDepartment') || '0';

    // Prefill the search fields with these values
    setKeyword(storedQuery);
    setSelectedDepartment(storedDepartment);

    // Perform the search with the prefilled values
    fetchProblems(storedQuery, storedDepartment);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search clicked with:', { keyword, selectedDepartment }); //
    fetchProblems(keyword, selectedDepartment);

    // Store search query and department in local storage
    localStorage.setItem('searchQuery', keyword);
    localStorage.setItem('selectedDepartment', selectedDepartment);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <section className="section-box-2">
          <div className="container">
            <div className="banner-hero banner-single banner-single-bg">
              <div className="block-banner text-center">
                <h3 className="wow animate__animated animate__fadeInUp">
                  <span className="color-brand-2">Problem Repository</span>
                </h3>
                <div className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                  Dive into a curated collection of research challenges. Collaborate with peers and faculty to innovate and solve real-world problems.
                </div>
                <div className="form-find text-start mt-40 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
                  <form onSubmit={handleSearch}>
                    <div className="box-industry">
                      <select 
                        className="form-input mr-10 select-active input-industry" 
                        value={selectedDepartment} 
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                      >
                        {departments.map(department => (
                          <option key={department.value} value={department.value}>
                            {department.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      className="form-input input-keysearch mr-10"
                      type="text"
                      placeholder="Your keyword..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="btn btn-default btn-find font-sm">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems Grid Section */}
        <section className="section-box mt-30">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 float-right">
                <div className="content-page">
                  <div className="box-filters-job">
                    {/* Filters Section */}
                  </div>

                  {/* Problems Cards */}
                  <div className="row">
                    {problems.map((problemItem, index) => {
                      if (!problemItem) {
                        return null;
                      }

                      return (
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
                          <div className="card-grid-2 hover-up" style={{ height: "380px" }}>
                            <div className="card-grid-2-image-left">
                              {/* StarButton Component */}
                              <span><StarButton problemId={problemItem.id} /></span>
                              <div className="image-box">
                                <img src="/assets/imgs/prorep (1).png" alt="jobBox" width="100" height="40" />
                              </div>
                              <div className="right-info">
                              <Link legacyBehavior href={`/company-details/${problemItem.id}`}>
                                  <a className="name-job">{problemItem.title}</a>
                                </Link>
                                <span className="small">
                                  <i className="fas fa-globe" style={{ marginRight: '5px', fontSize: '12px' }}></i> {problemItem.department}
                                </span>
                                <span className="small">
                                  <i className="fas fa-globe" style={{ marginRight: '5px', fontSize: '12px' }}></i> {problemItem.id}
                                </span>
                              </div>
                            </div>
                            <div className="card-block-info">
                              <h4>
                              <Link legacyBehavior href={`/company-details/${problemItem.id}`}>
  <a>{problemItem.title}</a>
</Link>
                              </h4>
                              <div className="mt-5">
                                <span className="card-briefcase">{problemItem.ids}</span>
                                <span className="card-time">
                                  <span>{problemItem.status}<span> mins ago</span></span>
                                </span>
                              </div>
                              <p className="font-sm color-text-paragraph mt-10" style={{ height: '60px', overflow: 'hidden' }}>
                                {truncateText(problemItem.statement, 10)}
                              </p>
                              <div className="card-2-bottom mt-20">
                                <div className="row">
                                  <div className="col-lg-6 col-6">
                                    <div className="d-flex">
                                      <div className="info-right-img">
                                        <span className="font-xs color-text-paragraph-2">{problemItem.department}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-6 text-end">
                                    <Link legacyBehavior href={`/problem-details/${problemItem.id}`}>
                                      <a className="btn btn-apply-now">View Details</a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
