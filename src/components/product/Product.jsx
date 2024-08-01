 import "../../styles/product.css"
 
 function Product(){
    return(
        <section className="section">
           
            <div className="formContainer">
            <h2>Leave A Message</h2>
            <p>Leave us a message and we will reach out to you ,may be we might have something interesting for you</p>
                <form className="form" data-aos="fade-up" data-aos-duration="1000">
                    
                    <div className="formGroup">
                        <div className="formItem">
                            <input type="text" id="fname" name="name" placeholder="First Name" required/>
                        </div>
                        <div className="formItem">
                            <input type="text" id="lname" name="name" placeholder="Last Name" required/>
                        </div>
                        <div className="formItem">
                            <input type="text" id="bemail" name="email" placeholder="Email Address" required/>
                        </div>
                    </div>
                    <div className="formGroup"> 
                        <div className="formItem">
                            <input type="text" id="job" name="job" placeholder="Current Job" required/>
                        </div>
                        <div className="formItem">
                            <input type="number" id="phone" name="phone" placeholder="Phone" required/>
                        </div>
                        <div className="formItem">
                            <input type="text" id="skill" name="skill" placeholder="Skill Area" required/>
                        </div>
                    </div>
                    <textarea id="message"  name="message" placeholder="Message"></textarea>
                    <div className="formFile">
                        <input type="file" id="file-upload" name="file-upload" required/>
                        <label htmlFor="file-upload" className="uploadLabel">Upload Resume</label><span>ONLY .PDF, .DOC, .DOCX FILE TYPES ARE ALLOWED. MAX SIZE 5MB</span>
                    </div>
                    <div className="formCheckbox">
                        <input type="checkbox"/>
                        <p>I have read Bytestrone`&apos;`s <a href="privacy.html" title="Privacy Policy">Privacy Policy</a> and agree to <a href="terms.html" title="Terms and Conditions">Terms and Conditions</a></p>
                    </div>
                    <div className="formSumbit">
                        <input type="submit" value="submit" className="submitBtn" />
                    </div>
                </form>
            </div>
        </section>
    )
}
export default Product