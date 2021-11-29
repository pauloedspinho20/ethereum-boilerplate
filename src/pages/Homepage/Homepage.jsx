import PageContainer from 'components/Page/Container';

// import './style.scss';

const Homepage = () => (
  <>
    <PageContainer>
      <div className="row">
        <h2 className="page-main-title">{ process.env.REACT_APP_SITE_NAME }</h2>
      </div>
    </PageContainer>

    <section className="section--landing">
      <PageContainer>
        <div className="row">
          <div className="col">
            Content
          </div>
        </div>
      </PageContainer>
    </section>
  </>
);

export default Homepage;
