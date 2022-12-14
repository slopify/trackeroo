import { Field, InputType, ObjectType } from 'type-graphql';
import 'reflect-metadata';

@ObjectType()
export class DashboardChart {
  @Field(() => [DashboardChartItem])
  data: DashboardChartItem[];
}

@ObjectType()
export class DashboardChartItem {
  @Field()
  date: string;

  @Field()
  value: number;
}

@InputType()
export class DashboardChartInput {
  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
