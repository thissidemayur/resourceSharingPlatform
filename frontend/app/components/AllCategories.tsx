import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AllCategories() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Books</SelectItem>
          <SelectItem value="banana">Sports</SelectItem>
          <SelectItem value="blueberry">Magazines</SelectItem>
          <SelectItem value="grapes">Electronics</SelectItem>
          <SelectItem value="pineapple">Furniture</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
