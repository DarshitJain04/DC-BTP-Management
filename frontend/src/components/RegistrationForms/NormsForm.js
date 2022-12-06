import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function NormsForm({ p1, p2 }) {
  const handleChange = (event) => {
    p2({ check: event.target.checked });
  };
  return (
    <React.Fragment>
      <div
        style={{
          overflowY: 'scroll',
          height: '350px',
          width: '100%',
          margin: 'auto',
          padding: '0 5%',
        }}
      >
        <br />

        <h3
          style={{
            textDecoration: 'underline',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Norms for Student Placements and Internships
        </h3>
        <p>
          The norms for students’ placement and internship processes are
          elucidated below. Students who register with the Career Development
          Cell (CDC), IIT Jodhpur to participate in the placement and internship
          are requested to read these guidelines carefully before registering
          for the process:{' '}
        </p>
        <br />
        <h4>
          <font color="black">General</font>
        </h4>
        <ol style={{ listStyle: 'disc' }}>
          <li>
            Placement registration is for one academic year only. Students are
            required to register to indicate their interest in the campus
            placement process. Only the registered students can sit for campus
            recruitments
          </li>
          <li>
            A student is expected to read the Job Announcement Form (JAF)/
            Internship Announcement Form (IAF) thoroughly before applying to a
            particular company.
          </li>
          <li>
            Information provided by the student to the CDC should be accurate.
            Sharing false information may lead to disciplinary action against
            the student.
          </li>
          <li>
            Once a student registers for a particular company, he/she is bound
            to attend the entire selection process of that company.
          </li>
          <li>
            During the Pre-Placement Talk by companies, a student is responsible
            to gather necessary information related to the company or the
            selection process well before the selection process begins.
          </li>
          <li>
            No student is allowed to contact any official of a company
            registered with the CDC. Only the student coordinators of the CDC
            can do so through a proper channel under the guidance of the Faculty
            Supervisor.
          </li>
          <li>
            A student appearing for the virtual selection process is required to
            log in to the test/interview platform at least 15 minutes before the
            scheduled starting time.
          </li>
          <font color="red">
            <li>
              Students are expected to register twice on the Career Development
              Cell website, once for the (August-December) term and again for
              the (January-April) term.
            </li>

            <li>
              If a student is found using any unfair means during the
              interview/tests, he/she shall be debarred from the respective
              company’s selection process and be liable to face disciplinary
              action.
            </li>
            <br />
            <br />
            <b>
              Please note: CDC only offers assistance to the students in the
              placement process. It does not take the responsibility of placing
              all the students.
            </b>
          </font>
        </ol>
        <p></p>

        <br />

        <h4 class="h4">
          <font color="black">Placement</font>
        </h4>
        <p class="card-text"></p>
        <ol>
          <li>
            {' '}
            Only the students graduating in the year 2022 are eligible to
            participate in the placement season 2021- 2022.
          </li>
          <li>
            {' '}
            It is mandatory for a student who has applied to a particular
            company to participate in the entire selection process conducted by
            that company.
          </li>
          <li>
            {' '}
            It is mandatory for a student to be dressed in business formals
            during the selection process.
          </li>
          <li>
            {' '}
            If a student receives a Pre-Placement Offer (PPO), he/she must
            accept or reject the offer before appearing for the selection
            process of other companies. If the student accepts the PPO then
            he/she will be considered out of the placement process of the
            subsequent companies. The student will have to reject the PPO to be
            allowed to appear in the selection process of other companies.
          </li>
          <li>
            {' '}
            If a student applies for a company but misses to appear in any stage
            of the selection process, he/she shall be debarred from applying to
            the following 3 companies of his/her domain that come for
            placements.
          </li>
          <li>
            {' '}
            If a student gets multiple job offers on a single day, then he/she
            should select one out of those and inform the CDC about his/her
            decision within the minimum stipulated time period.
          </li>
          <li>
            <font color="red">
              {' '}
              Suppose a student is extended an offer from a company, in that
              case, he/she will be out of campus recruitment process
              irrespective of the student’s response(accept/reject) to the
              offer. He/She is advised to accept the extended offer
            </font>
          </li>
          <li>
            A student who gets placed at a CTC of below Rs 5 Lakhs shall be
            given an option to apply to the companies that offer a CTC of above
            Rs 5 Lakhs. Once he/she has been offered a package above 5 lakhs,
            he/she will be out of the placement process
          </li>
          <font color="red">
            <li>
              {' '}
              Failure to disclose information regarding PPO to the CDC may lead
              to disciplinary action against the student.
            </li>
            <li>
              Any inappropriate behaviour by a student during the selection
              process of a company that hampers the Institute’s relationship
              with that company or hurts the reputation of the Institute shall
              call for strict disciplinary action against the student concerned.
            </li>
          </font>
        </ol>
        <br />
        <p>
          <b>
            Please note: CDC reserves the right to modify the norms as and when
            required
          </b>
        </p>
        <bt />
        <br />

        <h4 class="h4">
          <font color="black">Internship</font>
        </h4>
        <p class="card-text"></p>
        <ol>
          <li>
            {' '}
            Only the batch of students graduating in 2023 is eligible to
            participate in the campus recruitment season 2021-2022
          </li>
          <li>
            {' '}
            A student must inform regarding his/her PPO to the CDC within the
            same day of the offer being made
          </li>
          <font color="red">
            <li>
              Suppose a student is extended an internship from a company, in
              that case, he/she will be out of campus recruitment process
              irrespective of the student’s response(accept/reject) to the
              offer. He/She is advised to accept the extended internship
            </li>
          </font>
          <br />

          <li>
            If a student applies to a company but fails to show up at any stage
            of the selection process, then he/she shall be debarred from
            applying to the following 3 companies of his/her domain that come
            for internships
          </li>
          <li>
            If a student fails to join the internship of a company that extended
            him/her the offer on Day 1, Day 2 or Day 3 post-acceptance, he/she
            shall be denied from applying to any company on Day 1* of the
            successive placement season. *Day 1 refers to the first set of
            companies of the domain that apply to the candidate
          </li>
          <li>
            As an Intern in a company, a student is expected to create a
            positive image about himself/herself and the Institute. Any negative
            feedback received from the company during a student’s internship
            period will be taken seriously. It could lead to the debarment from
            the placement process of the other companies or any other
            disciplinary action as may deem appropriate.
          </li>
          <li>
            Any inappropriate behaviour by a student during the internship at a
            company that hampers the Institute’s relationship with that company
            or hurts the reputation of the Institute shall call for strict
            disciplinary action against the student concerned.
          </li>
        </ol>
        <p></p>
        <br />
        <p style={{ fontSize: '15px' }}>
          <b>
            {' '}
            Please note: CDC reserves the right to take disciplinary action
            against the student who violates the aforementioned norms of the
            Placement/ Internship Process
          </b>{' '}
        </p>
        <br />
        <b>
          <i>*The norms are last updated on 30-07-2021*</i>
        </b>
        <br />
        <br />
      </div>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              name="confirm"
              checked={p1}
              onChange={handleChange}
            />
          }
          label=" I have read the Placement Norms and hereby agree to comply."
        />
      </Grid>
    </React.Fragment>
  );
}
