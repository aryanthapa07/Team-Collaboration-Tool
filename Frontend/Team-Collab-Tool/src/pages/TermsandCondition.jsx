import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const TermsandCondition = () => {
  const navigate = useNavigate();
  const handleonClick = () => {
    navigate("/signup");
  };
  return (
    <main className="relative bg-gray-100 mt-2 mx-2">
      <Header />
      <section className="flex min-h-screen flex-1 flex-col pt-20 gap-2">
        <div className="w-full h-full relative">
          <div>
            <button
              onClick={handleonClick}
              className="bg-[#12aef5] hover:opacity-80 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
            <h1 className="font-bold text-2xl text-center">
              CollabSpace Terms and Conditions
            </h1>
          </div>
          <div className="text-center">
            <ul>
              <li>
                **Account Creation and Usage:**
                <ul>
                  <li>
                    Users must be at least 18 years old to create an account and
                    use the Tool.
                  </li>
                  <li>
                    Users agree to provide accurate and up-to-date information
                    when creating an account.
                  </li>
                  <li>
                    Users are responsible for maintaining the confidentiality of
                    their account credentials.
                  </li>
                </ul>
              </li>
              <li>
                **Workspace, Project, and Task Management:**
                <ul>
                  <li>
                    Users may create and manage workspaces, projects, and tasks
                    within the Tool.
                  </li>
                  <li>
                    Users agree to use the Tool in a manner that complies with
                    all applicable laws and regulations.
                  </li>
                  <li>
                    The Tools administrators reserve the right to remove or
                    modify any content that violates these terms or is deemed
                    inappropriate.
                  </li>
                </ul>
              </li>
              <li>
                **Intellectual Property:**
                <ul>
                  <li>
                    All content created or uploaded by users remains their
                    property.
                  </li>
                  <li>
                    Users grant the Tool a non-exclusive, worldwide,
                    royalty-free license to use, reproduce, modify, and
                    distribute their content for the purpose of providing the
                    Tools services.
                  </li>
                </ul>
              </li>
              <li>
                **Privacy:**
                <ul>
                  <li>
                    The Tools privacy policy outlines how user data is
                    collected, used, and protected.
                  </li>
                  <li>Users agree to the terms of the privacy policy.</li>
                </ul>
              </li>
              <li>
                **Limitation of Liability:**
                <ul>
                  <li>
                    The Tools providers shall not be liable for any indirect,
                    incidental, special, or consequential damages arising out of
                    the use or inability to use the Tool.
                  </li>
                </ul>
              </li>
              <li>
                **Termination:**
                <ul>
                  <li>
                    The Tools providers may terminate a users account or access
                    to the Tool at any time for any reason.
                  </li>
                  <li>
                    Users may terminate their account at any time by following
                    the instructions provided within the Tool.
                  </li>
                </ul>
              </li>
              <li>
                **Governing Law:**
                <ul>
                  <li>
                    These terms and conditions shall be governed by and
                    construed in accordance with the laws of [Jurisdiction].
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsandCondition;
