import Card from '../components/common/Card';
import { useAchievements } from '../hooks/usePortfolioData';
import './Achievements.css';

const Achievements = () => {
  const { data: achievements, loading } = useAchievements();

  if (loading) {
    return (
      <div className="achievements">
        <div className="container">
          <div className="loading">Loading achievements...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="achievements">
      <div className="container">
        <div className="achievements-header">
          <h1>Achievements & Awards</h1>
          <p>Recognition and milestones throughout my professional journey.</p>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <Card key={achievement.id} hover className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <h3>{achievement.title}</h3>
              <h4>{achievement.organization}</h4>
              <p className="achievement-date">{achievement.date}</p>
              <p className="achievement-description">{achievement.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
