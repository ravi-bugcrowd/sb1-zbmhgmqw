import React from 'react';
import { TradeRecommendation } from '../../types';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { TrendingUp, TrendingDown, Clock, Target, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface RecommendationCardProps {
  recommendation: TradeRecommendation;
  onViewDetails: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  recommendation, 
  onViewDetails 
}) => {
  const formattedTime = new Date(recommendation.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const formattedDate = new Date(recommendation.timestamp).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card
      hoverable
      className="transition-all duration-300 h-full border border-gray-200 dark:border-gray-700"
    >
      <CardHeader className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{recommendation.symbol}</h3>
            <Badge 
              variant={recommendation.type === 'BUY' ? 'success' : 'danger'}
              size="sm"
            >
              {recommendation.type}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{recommendation.name}</p>
        </div>
        <div className="flex items-center">
          <Badge 
            variant={recommendation.confidence >= 85 ? 'success' : recommendation.confidence >= 75 ? 'primary' : 'warning'}
            size="md"
            className="ml-2"
          >
            {recommendation.confidence}% Confidence
          </Badge>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Entry Price</span>
            <div className="flex items-center">
              <span className="text-base font-medium text-gray-900 dark:text-white">₹{recommendation.entryPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Target Price</span>
            <div className="flex items-center">
              <Target size={14} className="mr-1 text-green-500" />
              <span className="text-base font-medium text-green-600 dark:text-green-400">₹{recommendation.targetPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Stop Loss</span>
            <div className="flex items-center">
              <AlertCircle size={14} className="mr-1 text-red-500" />
              <span className="text-base font-medium text-red-600 dark:text-red-400">₹{recommendation.stopLoss.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Expected Duration</span>
            <div className="flex items-center">
              <Clock size={14} className="mr-1 text-blue-500" />
              <span className="text-base font-medium text-gray-900 dark:text-white">{recommendation.expectedDuration}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {recommendation.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {recommendation.reasoning}
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {formattedTime} | {formattedDate}
        </div>
        <Button size="sm" onClick={() => onViewDetails(recommendation.id)}>
          <div className="flex items-center">
            <span>Details</span>
            <ArrowRight size={14} className="ml-1" />
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;