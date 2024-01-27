class DescriptiveStatistics {
    constructor(data) {
      this.data = data;
    }
  
    // Measures of Central Tendency
    mean() {
      const sum = this.data.reduce((acc, val) => acc + val, 0);
      return sum / this.data.length;
    }
  
    median() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      const mid = Math.floor(sortedData.length / 2);
      return sortedData.length % 2 === 0
        ? (sortedData[mid - 1] + sortedData[mid]) / 2
        : sortedData[mid];
    }
  
    mode() {
      const frequencyMap = new Map();
      this.data.forEach((value) => {
        frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
      });
  
      let mode;
      let maxFrequency = 0;
  
      frequencyMap.forEach((frequency, value) => {
        if (frequency > maxFrequency) {
          mode = value;
          maxFrequency = frequency;
        }
      });
  
      return mode;
    }
  
    // Measures of Dispersion
    range() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      return sortedData[sortedData.length - 1] - sortedData[0];
    }
  
    variance() {
      const meanValue = this.mean();
      const squaredDifferences = this.data.map((value) => (value - meanValue) ** 2);
      const sumSquaredDiff = squaredDifferences.reduce((acc, val) => acc + val, 0);
      return sumSquaredDiff / this.data.length;
    }
  
    standardDeviation() {
      return Math.sqrt(this.variance());
    }
  
    // Additional Measures of Dispersion
    meanAbsoluteDeviation() {
      const meanValue = this.mean();
      const absoluteDifferences = this.data.map((value) => Math.abs(value - meanValue));
      return absoluteDifferences.reduce((acc, val) => acc + val, 0) / this.data.length;
    }
  
    interquartileRange() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      const mid = Math.floor(sortedData.length / 2);
      const lowerHalf = sortedData.slice(0, mid);
      const upperHalf = sortedData.slice(mid + (sortedData.length % 2 === 0 ? 0 : 1));
      return new DescriptiveStatistics(upperHalf).median() - new DescriptiveStatistics(lowerHalf).median();
    }
  }
  
  // Example usage
  const data = [16, 43, 20, 10, 8, 13, 17];
  const stats = new DescriptiveStatistics(data);
  
  console.log('Mean:', stats.mean());
  console.log('Median:', stats.median());
  console.log('Mode:', stats.mode());
  console.log('Range:', stats.range());
  console.log('Variance:', stats.variance());
  console.log('Standard Deviation:', stats.standardDeviation());
  console.log('Mean Absolute Deviation:', stats.meanAbsoluteDeviation());
  console.log('Interquartile Range:', stats.interquartileRange());
  