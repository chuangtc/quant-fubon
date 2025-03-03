import time
from datetime import datetime
import random

FILE_PATH = 'D:/workspace/random_num_hist.txt'
LOOP_TIMES = 10
SLEEP_TIME = 10
def write_random_num() -> None:
    with open(FILE_PATH, 'a') as f:
        for i in range(LOOP_TIMES):
            print(f"{i:2d} {datetime.now()} {random.randint(1,99999)}")
            f.write(f"{i:2d} {datetime.now()} {random.randint(1,99999)}\n")
            f.flush()
            time.sleep(SLEEP_TIME)


if __name__ == "__main__":
    write_random_num()
