const randomHash = (length = 7) => {
    let subStrLength = length;
    if (typeof subStrLength !== 'number') {
      subStrLength = 7;
    }
    return Math.random().toString(36).substring(subStrLength);
  };
  
  export default randomHash;
  