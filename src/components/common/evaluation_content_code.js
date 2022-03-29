{ ideaStage == 0 && 
                          
    <Col lg="6">
      <div styles={{ height: '500px', overflowY: 'scroll' }}>
        <Row form>
          {ideaItem.get("filterAnswer").map((question, index) => {
              const prefix = 'Q' + (index + 1)+ ': '
              const myQuestion = prefix + question["question"]
              return(
              <Col md="12" className="form-group">
                <Row className="mt-4">
                  <Col md="12">
                    <p className="mb-2">{myQuestion}</p>
                    <h6 style={{fontWeight: 500,  color: '#303030'}}>{question["answer"]}</h6>
                  </Col>
                </Row>
                
                  {/* <Row form>
                  <Col md="9">
                  <p className="mb-2">{question["question"]}</p>
                  <p className="mb-2">{question["answer"]}</p>
                  </Col>
                  </Row> */}
              </Col>)
          })}
          </Row>
      </div>
    </Col>
  }

  {ideaStage == 1 && 
    <Col lg="6">
      <Row form className="mt-4">
        <Col md="12" className="form-group">
          <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Choose how to proceed: '}</h6>
          <IdeaStatusSelect setEvalStatus={this.setEvalStatus}></IdeaStatusSelect>
        </Col>
      </Row>
      <Row form className="mt-4">
        <Col md="12" className="form-group">
          <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Estimate economic/output impact'}</h6>
          <Row>
            <Col>
              <FormInput
                id="expectedReturn"
                placeholder={'$15,000'}
                value={expectedReturn}
                onChange={this.setExpectedReturn}
              />
            </Col>
            <Col>
              <Select
                // value={ideaItem.get("teamMembers")}
                placeholder='month/year'
                onChange={this.setTimeUnit}
                options={[
                  {
                    value:'month',
                    label:'month'
                  }, 
                  {
                    value:'year',
                    label:'year'
                  }
                ]}
              />
            </Col>
            <Col>
              <Switch 
                 isOn={this.state.recurringImpact}
                handleToggle={() => this.setState({recurringImpact: !this.state.recurringImpact})}
                onColor="#633FDA"
                title="Recurring Impact"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row form >
        <Col md="12" className="form-group">
          <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Comments'}</h6>
            <FormTextarea 
              style={{ minHeight: "80px" }}
              id="ideaQuestion"
              placeholder={t('ANSWER')}
              // onChange={(event) => this.questionAnswerChangeField(event, idx)}
              required>
            </FormTextarea>
        </Col>
      </Row>
    </Col>
  }

  {ideaStage == 2 && 
    <Col lg="6">
      <Row className="mt-4">
          <Col md="6">
            <label htmlFor="firstName">Choose how to proceed: </label>
            <Row>
              <Col>
              {this.getIcon('Urgent', 'Black')}
                  <div className="mr-auto" style={{width: '100%', backgrounColor: 'black'}}>
                    <h6 style={{fontWeight: 500,  color: '#303030'}}>{ideaItem.get("category")}</h6>
                  </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Row className="mt-2">
              <Col>
                <label htmlFor="firstName">Employee Response Date</label>
                <h6 style={{fontWeight: 500,  color: '#303030'}}>{nowDate}</h6>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <label htmlFor="firstName">Idea Status</label>
                <h6 style={{fontWeight: 500,  color: '#303030'}}>Evaluated</h6>
              </Col>
            </Row>
            
          </Col>
      </Row>

      {/* Subject Matter Comments */}
      <Row form className="mt-4">
        <Col md="12" className="form-group">
          <label htmlFor="firstName">Idea Title</label>
          <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Great idea. With the right marketing investments we could probably generate over $15k/yr. We need to do a customer discovery process and do a more in-depth analysis.'}</h6>
        </Col>
      </Row>

      <Row form className="mt-4">
        <Col md="12" className="form-group">
          <label >{'Estimate economic/output impact'}</label>
          <Row>
            <Col>
              <h6 style={{fontWeight: 500,  color: '#303030'}}>{'$'+this.state.expectedReturn}</h6>
            </Col>
            <Col md="4">
              <h6 style={{fontWeight: 500,  color: '#303030'}}>{this.state.timeUnit}</h6>
            </Col>
            <Col md="4">
              <Switch 
                isOn={this.state.recurringImpact}
                disabled
                // handleToggle={() => this.setState({hasTeam: !hasTeam})}
                onColor="#633FDA"
                title="Recurring Impact"
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row form className="mt-4">
        <Col md="12" className="form-group">
          <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Choose an Idea Owner'}</h6>
            <ExecutionSelectNew evalType={'execution'} setResponsible={(res, idx) => this.changeResponsible(res, idx)} selectedVal={executionRes}/>
          <br/>
          <h6 style={{fontWeight: 500,  color: '#303030'}}>{'Choose an Idea Coach'}</h6>
            <ExecutionSelectNew evalType={'coach'} setResponsible={(res, idx) => this.changeCoach(res, idx)} selectedVal={coachRes}/>
        </Col>
      </Row>
    </Col>
  }