const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Nutrition-Obesity Predictor is running'
  });
});

app.post('/api/predict', (req, res) => {
  try {
    const { fat, carbs, protein, calories } = req.body;
    
    if (!fat || !carbs || !protein || !calories) {
      return res.status(400).json({ 
        error: 'Please provide all nutrition values'
      });
    }
    
    const obesity = 22.0 + 
                   (0.8 * fat) + 
                   (-0.3 * carbs) + 
                   (0.1 * protein) + 
                   (0.002 * (calories / 100));
    
    let category;
    if (obesity < 15) {
      category = 'Low';
    } else if (obesity < 28) {
      category = 'Medium';
    } else {
      category = 'High';
    }
    
    let cluster;
    if (fat < 20 && carbs > 70) {
      cluster = 'Traditional Diet | {Similar Countries: [Afghanistan, Angola, Bangladesh, Cambodia, Cameroon]}';
    } else if (fat > 30 && carbs < 55) {
      cluster = 'Western Diet | {Similar Countries: [USA, Australia, Austria, Argentina, Albania]}';
    } else if (fat > 25 && carbs > 60) {
      cluster = 'High-Energy Diet | {Similar Countries: [Chile, Colombia, Belize, Central African Republic]}';
    } else {
      cluster = 'Transitional Diet | {Similar Countries: [India, Algeria, Benin, Bolivia, Botswana]}';
    }
    
    const messages = {
      'Low': 'Great! Your nutrition pattern suggests low obesity risk.',
      'Medium': 'Moderate risk. Consider balancing your macronutrients.',
      'High': 'High risk. Consult a nutritionist for dietary advice.'
    };
    
    res.json({
      obesityPercentage: obesity.toFixed(1),
      category,
      cluster,
      message: messages[category],
      
      researchInsights: {
        fatCorrelation: '+0.509',
        carbsCorrelation: '-0.527',
        totalCountries: 141,
        yearsAnalyzed: '1990-2022',
        modelAccuracy: '60.5%',
        varianceExplained: '27.2%'
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Something went wrong',
      details: error.message 
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});