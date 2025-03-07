import time
from datetime import datetime
import random
import logging
import pytz

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s.%(msecs)03d %(levelname)-5s [%(name)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger('RandomWriter')

FILE_PATH = 'D:/workspace/random_num_hist.txt'
LOOP_TIMES = 10
SLEEP_TIME = 10
TAIPEI_TZ = pytz.timezone('Asia/Taipei')

def get_taipei_time() -> datetime:
    """Get current time in Taipei timezone"""
    return datetime.now(TAIPEI_TZ)

def is_weekday() -> bool:
    """Check if current day is a weekday (Mon-Fri) in Taipei"""
    return get_taipei_time().weekday() < 5

def write_random_num() -> None:
    if not is_weekday():
        logger.info('Skipping weekend day')
        return
        
    with open(FILE_PATH, 'a') as f:
        for i in range(LOOP_TIMES):
            current_time = get_taipei_time()
            random_num = random.randint(1,99999)
            output = f"{i:2d} {current_time} {random_num}"
            
            logger.info(output)
            f.write(f"{output}\n")
            f.flush()
            time.sleep(SLEEP_TIME)

if __name__ == "__main__":
    write_random_num()