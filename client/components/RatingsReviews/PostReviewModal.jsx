import React, {useState, useEffect} from 'react';

const QuestionModal = ({showRModal, onClose, name, submitQuestion}) => {

  // The three input fields for the question modal
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  // Modal style
  const modalStyle = {
    position: 'fixed',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const modalContent = {
    width: '80%',
    backgroundColor: '#fff'
  };
  const modalHeadFoot = {
    padding: '10px'
  };
  const modalBody = {
    padding: '10px',
    borerTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
  };

  // Helper function to verify email address
  const verifyEmail = (email) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(email);
  };

  // Pass formatted question data to parent component
  const handleSubmit = () => {
    if (ask === '' || nickname === '' || email === '' || !verifyEmail(email)) {
      alert('You must enter the correct information');
    } else {
      let formatQuestion = {
        question_body: ask,
        asker_name: nickname,
        asker_email: email,
        question_helpfulness: 0,
        answers: {},
        reported: false
      };
      submitQuestion(formatQuestion);
      onClose();
    }
  };

  return (showQModal && (
    <div className='modal' style={modalStyle} onClick={onClose}>
      <div className='modal-content' style={modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className='modal-header' style={modalHeadFoot}>
          <h4 className='modal-timer'>Write Your Review</h4>
          <h5>About the {name}</h5>
        </div>

        {/* Modal Body */}
        <div className='modal-body' style={modalBody}>
          <label htmlFor='overall-rating'>Overall Rating*</label><br/>
          <label htmlFor='recommend-product'>Do you recommend this product?*</label><br/>
          <label htmlFor='characteristics'>Characteristics*</label><br/>

          <label htmlFor='review-summary'>Review Summary</label><br/>
          <textarea id='review-summary' rows='4' cols='50' onChange={(e) => setSummary(e.target.value)}/> <br/>

          <label htmlFor='review-body'>Review Body*</label><br/>
          <textarea id='review-body' rows='4' cols='50' onChange={(e) => setBody(e.target.value)}/> <br/>

          <label htmlFor='your-photos'>Upload Your Photos</label><br/>
          <textarea id='your-photos' rows='4' cols='50'/> <br/>

          <label htmlFor='your-nickname'>What is your nickname?*</label><br/>
          <input type='text' id='your-nickname'placeholder='Example: jackson11!' onChange={(e) => setNickname(e.target.value)} /> <br/>
          <span>For privacy reasons, do not use your full name or email address</span>

          <label htmlFor='your-email'>Your Email*</label><br/>
          <input type='text' id='your-email' onChange={(e) => setEmail(e.target.value)}/> <br/>
          <span>For authentication reasons, you will not be emailed</span>
        </div>

        {/* Modal Footer */}
        <div className='modal-footer' style={modalHeadFoot}>
          <label htmlFor='warning-message'>Warning</label><br/>
          <button className='submitBtn' onClick={handleSubmit}>Submit</button>
          <button className='closeBtn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  ));
};

export default QuestionModal;