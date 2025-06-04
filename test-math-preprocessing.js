const text = '[ \\text{全年耗电量} = \\text{每日耗电量} \\times \\text{天数} = 10,\\text{度/天} \\times 365,\\text{天} = 3650,\\text{度} ]';
console.log('原始文本:', text);

// 模拟预处理函数
const preprocessMath = (text) => {
  let processed = text.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (match, mathContent) => {
    return `$$${mathContent.trim()}$$`;
  });
  
  processed = processed.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (match, mathContent) => {
    return `$${mathContent.trim()}$`;
  });
  
  return processed;
};

const result = preprocessMath(text);
console.log('处理后:', result); 