import mongoose from 'mongoose';

const verdictSchema = new mongoose.Schema({
  complaint: String,
  crime: String,
  suggestion: String,
  judgement: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Verdict = mongoose.model("Verdict", verdictSchema);
export default Verdict;
