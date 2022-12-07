import React from 'react';
import instance from '../../api/axios';

const FacultyProjects = () => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const [values1, setValues1] = React.useState([]);

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  const handleSubmit = () => {
    setLoading(true);
    var form = new FormData();
    form.append('name', values1.name);
    form.append('email', values1.email);
    form.append('role', values1.role);
    form.append('program_branch', values1.program_branch);
    instance
      .put('/profile/faculty_profile/', form)
      .then((res) => {
        if (res.status === 200) {
          window.alert('details updated successfully');
          window.location.reload();
        }
      })
      .catch(function (error) {
        if (error.response) {
          setError('Invalid Form. All * fields are required');
        }
        setLoading(false);
      });
  };

  React.useEffect(() => {
    instance
      .get('projects/projects_floated/')
      .then((res) => {
        console.log(res.data);
        setValues1({
          name: res.data[0].faculty.user.first_name,
          email: res.data.user.email,
          role: res.data.role.role,
          program_branch: res.data.program_branch.name,
        });
      })
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>HELLO</h1>
    </>
  );
};

export default FacultyProjects;
