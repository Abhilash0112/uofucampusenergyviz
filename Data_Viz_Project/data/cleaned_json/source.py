import pandas as pd
import json
import os
from collections import defaultdict
import progressbar
import codecs

root = 'JSON_Files'


def watt_to_btu(watts):
    """
    obj: converts watt to BTU / hr
    """
    return watts * 3.412141633


def group_buildings(root, delimitor='-'):
    """
    obj: identifies and groups together the appropriate files
    """
    file_groups = defaultdict(list)
    for subdir, dirs, files in os.walk(root):
        for file in files:
            file_groups[file.split(delimitor)[0]].append(file)
    return file_groups


def polish(df, time_cname='ts', energy_cname='v0'):
    df[time_cname] = df[time_cname].apply(lambda row: row.split(':')[1])
    df = df[df[energy_cname].apply(lambda row: len(str(row).split(':')) == 2)]
    df[energy_cname] = df[energy_cname].apply(lambda row: str(row).split(':')[1])
    return df


def build_json_groups_to_csv(file_key, files, out_path):
    """
    obj: combines json files into single csv
    """
    all_rows = []
    for file in files:
        file = os.path.join(root, file)
        try:
            with codecs.open(file, 'r', 'utf-8-sig') as json_file:
                json_data = json.load(json_file)
                rows = json_data['rows']
                all_rows.extend(rows)
        except json.decoder.JSONDecodeError as e:
            print(e)
            continue
    full_df = pd.DataFrame(all_rows)
    full_df = polish(full_df)
    full_df = make_units_consistent(full_df)

    if not os.path.exists(out_path):
        os.makedirs(out_path)

    full_df.to_csv(os.path.join(out_path, file_key+'.csv'), index=False)


def make_units_consistent(df, energy_colname='v0'):
    """
    obj: make energy output column have consistent units (into kbtu)
    """
    def _convert_to_kbtu(row_element):
        parts = row_element.split()
        number, unit = float(parts[0]), parts[1].lower()
        if unit == 'kwh':
            return str(number * 3.412141633 * 1000) + ' kBTU'
        elif unit == 'btu':
            return str(number/1000) + ' kBTU'
        elif unit == 'mmbtu':
            return str(number/1000/1000) + ' kBTU'
        elif unit == 'kbtu':
            return str(number) + ' kBTU'
        else:
            raise KeyError(f'Unexpected {unit} found when parsing.')
    df[energy_colname] = df[energy_colname].apply(_convert_to_kbtu)
    return df


def build_clean_csvs():
    """
    obj: do the thing
    """
    file_groups = group_buildings(root)
    bar = progressbar.ProgressBar()
    for group, files in bar(file_groups.items()):
        build_json_groups_to_csv(group, files, out_path='combined_csvs')


if __name__ == '__main__':
    build_clean_csvs()
