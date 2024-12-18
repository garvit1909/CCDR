import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import CategorySlider3 from "./../components/sliders/Category3";
import { useRouter } from "next/router";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const departments = [
  { value: '0', label: 'Select Department' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Electrical Engineering', label: 'Electrical Engineering' },
  { value: 'Design Engineering', label: 'Design Engineering' },
  { value: 'Engineering Physics', label: 'Engineering Physics' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Biotech Engineering', label: 'Biotech Engineering' },
  { value: 'Computer Science Engineering', label: 'Computer Science Engineering' }
];

export default function Index3() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("0");
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "problems"));
        const problemsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            tags: Array.isArray(data.tags)
              ? data.tags
              : typeof data.tags === "string"
              ? data.tags.split(", ").map((tag) => tag.trim())
              : [],
          };
        });
        setProblems(problemsData);
        setFilteredProblems(problemsData);
      } catch (error) {
        console.error("Error fetching problems from Firestore:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("selectedDepartment", selectedDepartment);
    router.push("/jobs-grid");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handlePopularSearchClick = (searchTerm) => {
    setSearchQuery(searchTerm);
    localStorage.setItem("searchQuery", searchTerm);
    localStorage.setItem("selectedDepartment", selectedDepartment);
    router.push("/jobs-grid");
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    localStorage.setItem("searchQuery", category);
    localStorage.setItem("selectedDepartment", selectedDepartment);
    router.push("/jobs-grid");
  };

  return (
    <Layout>
      <div className="homepage">
        <section className="section-box">
          <div className="banner-hero">
            <div className="banner-inner">
              <div className="block-banner">
                <h1
                  className="text-42 color-white wow animate__animated animate__fadeInUp"
                  style={{ textAlign: "center" }}
                >
                  <br className="d-none d-lg-block" />
                  Solve what matters.
                </h1>
                <div
                  className="font-lg font-regular color-white mt-20 wow animate__animated animate__fadeInUp"
                  data-wow-delay=".1s"
                  style={{ textAlign: "center" }}
                >
                  Simply search & find real-world problems for your research.
                </div>
                <div
                  className="form-find mt-40 wow animate__animated animate__fadeIn"
                  data-wow-delay=".2s"
                >
                  <form onSubmit={handleSearchSubmit}>
                    <div className="box-industry">
                      <select
                        className="form-input mr-10 select-active input-industry"
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                      >
                        {departments.map((dept) => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      className="form-input input-keysearch mr-10"
                      type="text"
                      style={{ fontSize: "16px", fontWeight: "500" }}
                      placeholder="Enter Search Query..... "
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button
                      className="btn btn-default btn-find font-sm"
                      style={{ backgroundColor: "#3C65F5" }}
                    >
                      Search
                    </button>
                  </form>
                </div>
                <div
                  className="list-tags-banner mt-20 wow animate__animated animate__fadeInUp"
                  data-wow-delay=".3s"
                  style={{ textAlign: "center" }}
                >
                  <strong style={{ color: "white" }}>Popular Searches:</strong>
                  <span
                    onClick={() => handlePopularSearchClick("Software")}
                    style={{
                      cursor: "pointer",
                      color: "white",
                      marginRight: "5px",
                    }}
                  >
                    Software
                  </span>
                  <span
                    onClick={() => handlePopularSearchClick("Network")}
                    style={{
                      cursor: "pointer",
                      color: "white",
                      marginRight: "5px",
                    }}
                  >
                    Network
                  </span>
                  <span
                    onClick={() => handlePopularSearchClick("Research")}
                    style={{
                      cursor: "pointer",
                      color: "white",
                      marginRight: "5px",
                    }}
                  >
                    Research
                  </span>
                  <span
                    onClick={() => handlePopularSearchClick("Developer")}
                    style={{
                      cursor: "pointer",
                      color: "white",
                      marginRight: "5px",
                    }}
                  >
                    Developer
                  </span>
                  <span
                    onClick={() => handlePopularSearchClick("Power")}
                    style={{
                      cursor: "pointer",
                      color: "white",
                      marginRight: "5px",
                    }}
                  >
                    Power
                  </span>
                  <span
                    onClick={() => handlePopularSearchClick("Sustainability")}
                    style={{
                      cursor: "pointer",
                      color: "white",
                      marginRight: "5px",
                    }}
                  >
                    Sustainability
                  </span>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="box-swiper">
                <CategorySlider3 onCategoryClick={handleCategoryClick} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
